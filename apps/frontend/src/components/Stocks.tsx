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
import Pagination from './Pagination.tsx'

let id = 0

const data = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "+1.51",
    pcChange: "-2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "-1.51",
    pcChange: "+2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "+12.51",
    pcChange: "+2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "-2.51",
    pcChange: "+2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "+1.51",
    pcChange: "+2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "+1.51",
    pcChange: "+2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "+1.51",
    pcChange: "-2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    pe: "27.46",
    price: "176.55",
    change: "+1.51",
    pcChange: "-2.45",
    volume: "101.67M",
    avgVolume: "61.672M",
    marketCap: "2.726T",
  },
]

export default function Stocks() {
  return (
    <>
      <Card className="pb-0 my-4">
        <TableRoot>
          <Table className="border-b-0">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Symbol</TableHeaderCell>
                <TableHeaderCell>Company</TableHeaderCell>
                <TableHeaderCell>P/E</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Change</TableHeaderCell>
                <TableHeaderCell>% Change</TableHeaderCell>
                <TableHeaderCell>Volume</TableHeaderCell>
                <TableHeaderCell>Avg Volume</TableHeaderCell>
                <TableHeaderCell>Market Cap</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={id++}>
                  <TableCell>{item.symbol}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.pe}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <span className={`${parseFloat(item.change) > 0 ? 'dark:text-emerald-400' : 'dark:text-red-400'}`}>
                      {item.change}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={parseFloat(item.pcChange) > 0 ? 'success' : 'error'}
                    >
                      {item.pcChange}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.avgVolume}</TableCell>
                  <TableCell>{item.marketCap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </Card>
      <Pagination />
    </>
  )
}
