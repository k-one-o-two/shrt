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
  await deleteLink(random);
  res.status(200).send('ok');
}

async function deleteLink(random: string) {
  const { clicks, links, close } = await mongoService.connect();

  await clicks.deleteMany({ random });
  await links.deleteMany({ random });

  close();

  return;
}
