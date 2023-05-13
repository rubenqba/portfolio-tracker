'use client';

import { Card, Title, Text } from '@tremor/react';
import CashFlowTable from './cashflow-table';
import { CashFlow } from '@model/cashflow';
import { useCashFlow } from '../../hooks/useCashFlow';

export default function CashFlowData() {
  const { operations, isError, isLoading } = useCashFlow();

  if (isError) return <div>Failed to load</div>; //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  return (
    <Card className="mt-6">
      {/* @ts-expect-error Server Component */}
      <CashFlowTable operations={operations} />
    </Card>
  );
}
