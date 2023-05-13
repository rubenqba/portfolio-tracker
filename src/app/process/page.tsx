import { Title, Text } from '@tremor/react';
import Search from '../search';
import CashFlowData from './cashflow-data';

export default function CashFlowPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Cash flow operations</Title>
      <Text>A list of operations retrieved from GBM.</Text>
      <Search />
      <CashFlowData />
    </main>
  );
}


