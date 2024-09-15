import Navigation from './components/Navigation.tsx'
import Screener from './components/Screener.tsx'
import Markets from './components/Markets.tsx'
import Stock from './components/Stock.tsx'

export default function App() {
  return (
    <div className="w-4/5 mt-6 mx-auto">
      <Navigation />
      {/*<Stock />*/}
      {/*<Screener />*/}
      <Markets />
    </div>
  )
}
