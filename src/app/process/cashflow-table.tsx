import { CashFlow, CashFlowOperation } from '@model/cashflow';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

export default async function CashFlowTable({
  operations
}: {
  operations: CashFlow[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nr</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Time</TableHeaderCell>
          <TableHeaderCell>Ticker</TableHeaderCell>
          <TableHeaderCell>Operation</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {operations.map((op, idx) => (
          <TableRow key={op.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{op.date}</TableCell>
            <TableCell>{op.time}</TableCell>
            <TableCell>{op.ticker}</TableCell>
            <TableCell>
              <Text>{op.type}</Text>
            </TableCell>
            <TableCell>{op.amount * (op.type === CashFlowOperation.DEPOSITO ? 1 : -1)}</TableCell>
            <TableCell>
              <Text>{op.description}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
