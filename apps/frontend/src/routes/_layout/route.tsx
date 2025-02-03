import { createFileRoute, Outlet } from '@tanstack/react-router';
import Navigation from '../../components/Navigation.tsx';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <Navigation />
      <div className="p-6 xl:px-0">
        <Outlet />
      </div>
    </>
  );
}
