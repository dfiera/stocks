import {
  createContext,
  ReactNode,
  useContext,
} from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { LoginCredentials } from '../types.ts';
import { checkAuthQueryOptions } from '../api/queries.ts';
import { useLogin, useLogout} from '../api/mutations.ts';

export interface AuthContext {
  isAuthenticated: boolean;
  login: ReturnType<typeof useMutation<any, Error, LoginCredentials, unknown>>;
  logout: ReturnType<typeof useMutation<void, Error, void, unknown>>;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const { data: isAuthenticated } = useSuspenseQuery(checkAuthQueryOptions);
  const login = useLogin();
  const logout = useLogout();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
