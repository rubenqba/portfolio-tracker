import { CashFlow } from '@model/cashflow';
import useSWR from 'swr';

const fetcher = (url: string): Promise<CashFlow[]> =>
  fetch(url).then((res) => res.json());

export const useCashFlow = () => {
  const { data, error, isLoading } = useSWR(`/api/cash/operations`, fetcher);

  return {
    operations: data,
    isLoading,
    isError: error
  };
};
