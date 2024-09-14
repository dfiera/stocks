import { Button } from './Button.tsx'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './Select.tsx'
import { Label } from './Label.tsx';

const data = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '40',
    label: '40',
  },
  {
    value: '50',
    label: '50',
  },
]

export default function Pagination() {
  return (
    <div className="flex justify-end items-center text-sm dark:text-white">
      <Label htmlFor="rows-per-page" className="min-w-fit">Rows per page:</Label>
      <Select defaultValue={data[0].value}>
        <SelectTrigger id="rows-per-page" className="ml-2 max-w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="min-w-fit mx-4">Page 1 of 25</p>
      <div className="flex gap-2">
        <Button variant="secondary" className="min-w-24">
          Previous
        </Button>
        <Button variant="secondary" className="min-w-24">
          Next
        </Button>
      </div>
    </div>
  )
}
