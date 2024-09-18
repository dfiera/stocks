import { createFileRoute } from '@tanstack/react-router'
import Stock from '../../components/Stock.tsx'

const fetchStockData = async (symbol: string) => {
  const response = await fetch(`http://localhost:3000/overview/${symbol}`)
  return await response.json()
}

export const Route = createFileRoute('/stocks/$symbol')({
  loader: async ({ params }) => {
    return fetchStockData(params.symbol)
  },
  component: StockData,
})

function StockData() {
  const loaderData = Route.useLoaderData()

  return (
    <Stock data={loaderData} />
  )
}
