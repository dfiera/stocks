import { createFileRoute } from '@tanstack/react-router'
import Markets from '../components/Markets.tsx'

export const Route = createFileRoute('/')({
  component: Markets
})
