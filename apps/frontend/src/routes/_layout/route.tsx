import { createFileRoute, Outlet } from '@tanstack/react-router';
import Navigation from '../../components/Navigation.tsx';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <Navigation/>
      <Outlet />
    </>
  );
}
