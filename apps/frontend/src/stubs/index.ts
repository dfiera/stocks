const chartData = [
  {
    month: "Jan 21",
    Performance: 4000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
  },
  {
    month: "Apr 21",
    Performance: 2780,
  },
  {
    month: "May 21",
    Performance: 1890,
  },
  {
    month: "Jun 21",
    Performance: 2390,
  },
  {
    month: "Jul 21",
    Performance: 3490,
  },
]

const symbols = [
  {
    symbol: 'AAPL',
    company: 'Apple Inc.'
  },
  {
    symbol: 'MSFT',
    company: 'Microsoft Corporation'
  },
  {
    symbol: 'GOOG',
    company: 'Alphabet Inc.'
  },
  {
    symbol: 'META',
    company: 'Meta Platforms, Inc.'
  },
  {
    symbol: 'META',
    company: 'Meta Platforms, Inc.'
  },
]

const sortData = [
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

interface DataItem {
  date: string
  revenue: number
}

const areaChartData: DataItem[] = [
  {
    date: "Jan 23",
    revenue: 2340,
  },
  {
    date: "Feb 23",
    revenue: 3110,
  },
  {
    date: "Mar 23",
    revenue: 4643,
  },
  {
    date: "Apr 23",
    revenue: 4650,
  },
  {
    date: "May 23",
    revenue: 3980,
  },
  {
    date: "Jun 23",
    revenue: 4702,
  },
  {
    date: "Jul 23",
    revenue: 5990,
  },
  {
    date: "Aug 23",
    revenue: 5700,
  },
  {
    date: "Sep 23",
    revenue: 4250,
  },
  {
    date: "Oct 23",
    revenue: 4182,
  },
  {
    date: "Nov 23",
    revenue: 3812,
  },
  {
    date: "Dec 23",
    revenue: 4900,
  },
]

export {
  chartData,
  symbols,
  sortData,
  areaChartData
}
