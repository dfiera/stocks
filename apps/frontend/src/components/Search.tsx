import { useState } from 'react'
import { Input } from './Input.tsx'

export default function Search() {
  const [search, setSearch] = useState('')

  return (
    <div className="max-w-xs">
      <Input
        placeholder="Search for a company or symbol"
        id="search"
        name="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  )
}
