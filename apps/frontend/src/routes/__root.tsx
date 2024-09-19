import { createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import App from '../App.tsx'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: App,
})
