import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../socket.ts';

interface QuoteEvent {
  c: number;
  d: number;
  dp: number;
  o: number;
  h: number;
  l: number;
  pc: number;
}

interface Quote {
  price: number;
  change: number;
  changePercentage: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
}

export const useQuoteSubscription = () => {
  const queryClient = useQueryClient();
  const socketRef = useRef<typeof socket | null>(null);
  const activeSymbols = useRef(new Set<string>());
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.connect();

    const onConnect = () => {
      setIsConnected(true);
      setError(null);
      console.log('Connected to socket');

      activeSymbols.current.forEach((symbol) => {
        socketRef.current?.emit('subscribe', symbol);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from socket');
    };

    const onConnectError = (error: Error) => {
      setError(`Connection to socket failed: ${error.message}`);
    };

    const onQuoteUpdate = (event: { entity: string[]; symbol: string; quote: QuoteEvent }) => {
      const { c, d, dp, o, h, l, pc } = event.quote;
      const updatedQuote: Quote = {
        price: c,
        change: d,
        changePercentage: dp,
        open: o,
        high: h,
        low: l,
        previousClose: pc
      };
      const queryKey = [...event.entity, event.symbol].filter(Boolean);
      queryClient.setQueryData(queryKey, (oldData: Quote) => {
        const update = (entity: Quote) =>
          entity
            ? { ...entity, ...updatedQuote }
            : entity;

        return Array.isArray(oldData)
          ? oldData.map(update)
          : update(oldData);
      });

      console.log('New quote event:', event);
    };

    socketRef.current?.on('connect', onConnect);
    socketRef.current?.on('disconnect', onDisconnect);
    socketRef.current?.on('connect_error', onConnectError);
    socketRef.current?.on('quoteUpdate', onQuoteUpdate);

    return () => {
      if (socketRef.current) {
        if (getActiveSymbols().length > 0) {
          unsubscribe(getActiveSymbols());
        }
        activeSymbols.current.clear();
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners();
      }
    };
  }, []);

  const subscribe = useCallback((symbols: string[]) => {
    if (!socketRef.current?.connected) {
      setError('Cannot subscribe to symbols: socket not connected');
      return false;
    }

    try {
      socketRef.current.emit('subscribe', symbols);
      symbols.forEach((symbol) => {
        activeSymbols.current.add(symbol);
      });

      return true;
    } catch (error) {
      setError(`Subscription failed: ${(error as Error).message}`);
      return false;
    }
  }, []);

  const unsubscribe = useCallback((symbols: string[]) => {
    if (!socketRef.current?.connected) {
      setError('Cannot unsubscribe from symbols: socket not connected');
      return false;
    }

    try {
      socketRef.current.emit('unsubscribe', symbols);
      symbols.forEach((symbol) => {
        activeSymbols.current.delete(symbol);
      });

      return true;
    } catch (error) {
      setError(`Unsubscribe failed: ${(error as Error).message}`);
      return false;
    }
  }, []);

  const getActiveSymbols = useCallback(() => {
    return Array.from(activeSymbols.current);
  }, []);

  return {
    isConnected,
    error,
    subscribe,
    unsubscribe,
    getActiveSymbols
  };
};
