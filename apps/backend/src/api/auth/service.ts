import { promisify } from 'node:util';
import crypto from 'node:crypto';
import { findUserByEmail, storeUserCredentials } from '../../db/queries.ts';
import logger from '../../utils/logger.ts';
import * as watchlistService from '../watchlists/service.ts';

const randomBytesAsync = promisify(crypto.randomBytes);
const scryptAsync: (arg1: crypto.BinaryLike, arg2: crypto.BinaryLike, arg3: number) => Promise<Buffer> = promisify(crypto.scrypt);

const getHash = async (password: string, salt: string, hashLength: number = 32) => {
  try {
    return (await scryptAsync(password, salt, hashLength)).toString('hex');
  } catch (error) {
    throw new Error(`Error deriving key: ${(error as Error).message}`);
  }
};

const encodeHashWithSalt = (salt: string, hash: string) => {
  return `${salt}:${hash}`;
};

const decodeHashWithSalt = (key: string) => {
  const [salt, hash] = key.split(':');
  return { salt, hash };
};

const hashPassword = async (password: string) => {
  try {
    const salt = (await randomBytesAsync(16)).toString('hex');
    const hash = await getHash(password, salt);

    return encodeHashWithSalt(salt, hash);
  } catch (error) {
    throw new Error(`Error hashing password: ${(error as Error).message}`);
  }
};

const compare = async (password: string, encodedKey: string) => {
  try {
    const { salt, hash: storedHash } = decodeHashWithSalt(encodedKey);
    const computedHash = await getHash(password, salt);

    return storedHash === computedHash;
  } catch (error) {
    throw new Error(`Error comparing passwords: ${(error as Error).message}`);
  }
};

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  const userId = await storeUserCredentials(email, hashedPassword);
  // Create default watchlist after user creation
  await watchlistService.createDefaultWatchlist(userId);
};

export const validateCredentials = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    logger.info('User not found');
    return null;
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    logger.info('Invalid password');
    return null;
  }

  return user;
};
