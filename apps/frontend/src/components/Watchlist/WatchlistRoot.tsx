import { useAuth } from '../../context/AuthContext.tsx';
import Watchlist from './Watchlist.tsx';
import WatchlistPreview from './WatchlistPreview.tsx';

export default function WatchlistRoot() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Watchlist />
    : <WatchlistPreview />
}
