import { Request, Response, NextFunction } from 'express';
import { promisify } from 'node:util';
import * as authService from './service.ts';

export const getAuthStatus = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(200).json({
      authenticated: false
    });
  }

  res.status(200).json({
    authenticated: true
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    await authService.storeCredentials(email, password);

    res.status(201).json({ message: 'Successfully registered' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await authService.validateCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create session
    req.session.user = {
      id: user.id,
      email: user.email
    };

    res.status(200).json({ message: 'Successfully logged in' });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const destroySessionAsync = promisify(req.session.destroy).bind(req.session);

  try {
    await destroySessionAsync();

    res
      .clearCookie('sid', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        domain: process.env.COOKIE_DOMAIN || 'localhost'
    })
      .status(200)
      .end();
  } catch (error) {
    next(error);
  }
};
