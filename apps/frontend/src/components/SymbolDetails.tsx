import { Suspense, useCallback, useState } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { usePrefetchSymbolData } from '../hooks/usePrefetchSymbolData.ts';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from './Drawer.tsx';
import { Button } from './Button.tsx';
import Stock from './Stock.tsx';

interface SymbolDetailsProps {
  open: boolean;
  symbol: string;
  onOpenChange: (open: boolean) => void;
}

export const SymbolDetails = ({ open, symbol, onOpenChange }: SymbolDetailsProps) => {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="min-w-[66%]">
        <DrawerClose asChild>
          <Button
            variant="ghost"
            className="w-fit aspect-square hover:bg-gray-100 hover:dark:bg-gray-400/10"
          >
            <RiCloseLine className="size-6 shrink-0" aria-hidden />
          </Button>
        </DrawerClose>
        <DrawerBody className="min-w-fit">
          <Suspense fallback={<div>Loading...</div>}>
            <Stock symbol={symbol} />
          </Suspense>
        </DrawerBody>
        <DrawerFooter>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const useSymbolDetails = () => {
  const [state, setState] = useState<{
    open: boolean;
    symbol: string;
  }>({
    open: false,
    symbol: ''
  });

  const prefetchSymbolData = usePrefetchSymbolData();

  const openSymbolDetails = async (symbol: string) => {
    await prefetchSymbolData(symbol);

    setState((prev) => ({ ...prev, open: true, symbol }));
  };

  const handleOpenChange = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, open }));
  }, []);

  return {
    isOpen: state.open,
    symbol: state.symbol,
    openSymbolDetails,
    onOpenChange: handleOpenChange
  };
};
