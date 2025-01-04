import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import type { AuthContext } from '../context/AuthContext.tsx';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface RouterContext {
  queryClient: InstanceType<typeof QueryClient>;
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="w-4/5 pt-5 mx-auto">
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </div>
    </>
  )
}
