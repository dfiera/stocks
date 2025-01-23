import type { ScreenerOptions, StockScreener, StockScreenerAPIResponse } from './types.ts';
import {
  getScreenerRowsWithCount,
  isStockScreenerTableEmpty,
  populateScreenerTable
} from '../../db/queries.ts';

const fetchScreenerFromExternalAPI = async (): Promise<StockScreenerAPIResponse[]> => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/stock-screener?apikey=${process.env.FMP_API_KEY}&isActivelyTrading=true&limit=20000`);

  if(!response.ok) {
    throw new Error(`Failed to fetch screener data from API: ${response.statusText}`);
  }

  return response.json();
};

export const getScreener = async (options: ScreenerOptions): Promise<{ data: StockScreener[]; totalCount: number; currentPage: number; pageCount: number }> => {
  const isEmpty = await isStockScreenerTableEmpty();

  if (isEmpty) {
    const data = await fetchScreenerFromExternalAPI();
    await populateScreenerTable(data);
  }

  const [rows, totalCount] = await getScreenerRowsWithCount(options);

  return {
    data: rows,
    totalCount,
    currentPage: options.page,
    pageCount: Math.ceil(totalCount / options.pageSize)
  };
};
