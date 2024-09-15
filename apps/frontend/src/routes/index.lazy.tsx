import { createLazyFileRoute } from '@tanstack/react-router'
import Markets from '../components/Markets.tsx'

export const Route = createLazyFileRoute('/')({
  component: Markets
})
