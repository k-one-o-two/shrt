import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoService } from '@/services/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ res: string } | string>,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).send('bad request');
    return;
  }

  const { random } = JSON.parse(req.body);
  await deleteLink(random);
  res.status(200).send({ res: 'ok' });
}

async function deleteLink(random: string): Promise<void> {
  const { clicks, links, close } = await mongoService.connect();

  await clicks.deleteMany({ random });
  await links.deleteMany({ random });

  await close();

  return;
}
