import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select.tsx'
import { Button } from './Button.tsx'
import Search from './Search.tsx'
import Stocks from './Stocks.tsx'
import Pagination from './Pagination.tsx'
import { sortData } from '../stubs'

function Sort() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="sm:w-72">
          <SelectValue placeholder="Sort stocks by investment criteria" aria-label={value} />
        </SelectTrigger>
        <SelectContent>
          {sortData.map((item) => (
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
    <>
      <div className="flex flex-col gap-5 sm:flex-row">
        <Sort />
        <Search />
      </div>
      <Stocks />
      <Pagination />
    </>
  )
}
