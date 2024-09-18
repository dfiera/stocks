import { createLazyFileRoute } from '@tanstack/react-router'
import Screener from '../components/Screener.tsx'

export const Route = createLazyFileRoute('/')({
  component: Screener
})
