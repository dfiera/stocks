import { useState } from 'react'
import { Input } from './Input.tsx'

export default function Search() {
  const [search, setSearch] = useState('')

  return (
    <Input
      className="sm:max-w-xs"
      placeholder="Search for a company or symbol"
      id="search"
      name="search"
      type="search"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}
