import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import Login from '../components/Login.tsx'

export const fallback = '/' as const;

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context: { auth }, search }) => {
    if (auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: Login,
});
