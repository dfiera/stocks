import { createFileRoute } from '@tanstack/react-router'
import Markets from '../../components/Markets.tsx'

export const Route = createFileRoute('/_layout/markets')({
  component: Markets,
})
