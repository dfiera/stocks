import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Navigation from './components/Navigation.tsx'

export default function App() {
  return (
    <>
      <div className="w-4/5 mt-6 mx-auto">
        <Navigation/>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  )
}
