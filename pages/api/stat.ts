import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoService } from '@/services/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400);
    return;
  }

  const { random } = JSON.parse(req.body);
  const stat = await getStat(random);

  res.status(200).json({ stat });
}

async function getStat(random: string) {
  const { clicks, close } = await mongoService.connect();
  const clicksStat = clicks.find({ random });

  const array = await clicksStat.toArray();

  close();

  return array;
}
