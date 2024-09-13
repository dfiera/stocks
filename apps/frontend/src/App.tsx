import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './components/Select.tsx'
import { Button } from './components/Button.tsx'
import Navigation from './components/Navigation.tsx'
import Search from './components/Search.tsx'
import Stocks from './components/Stocks.tsx'

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
        <SelectTrigger className="h-10 max-w-xs">
          <SelectValue placeholder="Sort stocks by criteria" aria-label={value}/>
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

export default function App() {
  return (
    <div className="w-4/5 mt-6 mx-auto">
      <Navigation/>
      <Sort />
      <Search/>
      <Stocks/>
    </div>
  )
}
