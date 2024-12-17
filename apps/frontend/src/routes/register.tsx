import { createFileRoute } from '@tanstack/react-router';
import Register from '../components/Register.tsx';

export const Route = createFileRoute('/register')({
  component: Register
});
