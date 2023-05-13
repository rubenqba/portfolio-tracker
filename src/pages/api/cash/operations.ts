import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { CashFlow, CashFlowUtils, RawCashFlow } from '@model/cashflow';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CashFlow[]>) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'data');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/cash.json', 'utf8');
  //Return the content of the data file in json format
const raw = JSON.parse(fileContents) as RawCashFlow[];


  res.status(200).json(raw.map(op => CashFlowUtils.transform(op)));
}
