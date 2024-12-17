import React, { useState } from 'react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext.tsx';
import { fallback, Route as LoginRoute } from '../routes/login.tsx';
import { Toaster } from './Toaster.tsx';
import { Label } from './Label.tsx';
import { Input } from './Input.tsx';
import { Button } from './Button.tsx';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const search = LoginRoute.useSearch();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);

    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const emailFieldValue = data.get('email');
      const passwordFieldValue = data.get('password');

      if (!emailFieldValue || !passwordFieldValue) {
        return;
      }

      const email = emailFieldValue.toString();
      const password = passwordFieldValue.toString();

      login.mutate({ email, password }, {
        onSuccess: () => {
          router.invalidate();
          navigate({ to: search.redirect || fallback });
        }
      });
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm dark:text-white">
          <h3 className="text-center font-semibold">
            Welcome back
          </h3>
          <form onSubmit={onFormSubmit} className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="font-medium"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="john@company.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="font-medium"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                placeholder="password"
                className="mt-2"
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="mt-4 w-full whitespace-nowrap py-2 text-center font-medium"
            >
              Continue
            </Button>
          </form>
          <p className="mt-6 text-sm dark:text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
