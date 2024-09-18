import { createLazyFileRoute } from '@tanstack/react-router'
import Screener from '../components/Screener.tsx'

const fetchScreenerData = async () => {
  const response = await fetch('http://localhost:3000/screener')
  return await response.json()
}

export const Route = createLazyFileRoute('/screener')({
  loader: async () => {
    return fetchScreenerData()
  },
  component: ScreenerData
})

function ScreenerData() {
  const loaderData = Route.useLoaderData()

  return (
    <Screener data={loaderData} />
  )
}
