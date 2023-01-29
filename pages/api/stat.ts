import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoService } from '@/services/mongo';
import { StatItem } from 'types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ stat: StatItem[] } | string>,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).send('bad request');
    return;
  }

  const { random } = JSON.parse(req.body);
  const stat = await getStat(random);

  res.status(200).json({ stat });
}

async function getStat(random: string) {
  const { clicks, close } = await mongoService.connect();
  const clicksStat = clicks.find({ random });

  const array = (await clicksStat.toArray()) as StatItem[];

  await close();

  return array;
}
