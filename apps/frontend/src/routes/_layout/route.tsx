import { createFileRoute, Outlet } from '@tanstack/react-router';
import Navigation from '../../components/Navigation.tsx';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <div className="w-4/5 mt-6 mx-auto">
        <Navigation/>
        <Outlet />
      </div>
    </>
  );
}
