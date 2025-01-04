import { Link } from '@tanstack/react-router'
import { Card } from './Card.tsx'
import {
  TableRoot,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
} from './Table.tsx'
import { Badge } from './Badge.tsx'
import type { Screener } from '../types.ts';

let id = 0

export default function Stocks({ data }: { data: Screener[] }) {
  return (
    <Card className="pb-0 my-4">
      <TableRoot>
        <Table className="border-b-0">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Symbol</TableHeaderCell>
              <TableHeaderCell>Company</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Change</TableHeaderCell>
              <TableHeaderCell>% Change</TableHeaderCell>
              <TableHeaderCell>Volume</TableHeaderCell>
              <TableHeaderCell>P/E</TableHeaderCell>
              <TableHeaderCell>Market Cap</TableHeaderCell>
              <TableHeaderCell>EPS</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={id++}>
                <TableCell>
                  <Link to="/stocks/$symbol" params={{ symbol: item.symbol }}>
                    {item.symbol}
                  </Link>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <span className={`${(item.change > 0) ? 'dark:text-emerald-400' : 'dark:text-red-400'}`}>
                    {(item.change > 0) ? '+' : ''}{item.change.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.changePercentage > 0 ? 'success' : 'error'}
                  >
                    {(item.change > 0) ? '+' : ''}{item.changePercentage.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>{item.pe}</TableCell>
                <TableCell>{item.marketCap}</TableCell>
                <TableCell>{item.eps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </Card>
  )
}
