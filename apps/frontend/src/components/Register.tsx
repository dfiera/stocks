import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useRegisterUser } from '../api/mutations.ts';
import { useToast } from '../hooks/useToast.ts';
import { Label } from './Label.tsx';
import { Input } from './Input.tsx';
import { Button } from './Button.tsx';

export default function Register() {
  const registerUser = useRegisterUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

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

      registerUser.mutate({ email, password }, {
        onSuccess: () => {
          navigate({ to: '/login' });
          toast({
            title: 'Account created successfully',
            description: 'You can now login to your account.',
            variant: 'success',
            duration: 10000
          });
        }
      });
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm dark:text-white">
          <h3 className="text-center font-semibold">
            Create an account
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
              Register
            </Button>
          </form>
          <p className="mt-6 text-sm dark:text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
