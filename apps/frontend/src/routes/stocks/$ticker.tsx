import { createFileRoute } from '@tanstack/react-router'
import Stock from '../../components/Stock.tsx'

export const Route = createFileRoute('/stocks/$ticker')({
  component: Stock
})
