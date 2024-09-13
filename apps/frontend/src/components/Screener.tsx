import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select.tsx'
import { Button } from './Button.tsx'
import Navigation from './Navigation.tsx'
import Search from './Search.tsx'
import Stocks from './Stocks.tsx'
import Pagination from './Pagination.tsx'

function Sort() {
  const [value, setValue] = useState('')

  const data = [
    {
      value: 'marketCap',
      label: 'Market Cap',
    },
    {
      value: 'eps',
      label: 'Earnings per Share',
    },
    {
      value: 'cashFlow',
      label: 'Operating Cash Flow',
    },
    {
      value: 'roi',
      label: 'Multi-year Return on Investment',
    },
  ]

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="sm:w-72">
          <SelectValue placeholder="Sort stocks by investment criteria" aria-label={value} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <span>{item.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="whitespace-nowrap"
        variant="secondary"
        onClick={() => setValue('')}
      >
        Reset selection
      </Button>
    </div>
  )
}

export default function Screener() {
  return (
    <div className="w-4/5 mt-6 mx-auto">
      <Navigation/>
      <div className="flex flex-col gap-5 sm:flex-row">
        <Sort/>
        <Search/>
      </div>
      <Stocks/>
      <Pagination/>
    </div>
  )
}
