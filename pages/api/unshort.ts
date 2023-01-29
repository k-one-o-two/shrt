import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoService } from '@/services/mongo';
import { Link } from 'types';
require('dotenv').config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Link } | string>,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).send('bad request');
    return;
  }

  const { link, preventRecord } = JSON.parse(req.body);

  const ransomStrLength = Number(process.env.RANDOM_LENGTH) * 2;

  const linkTestReg = new RegExp(`^[a-f0-9]{${ransomStrLength}}$`);

  if (!linkTestReg.test(link)) {
    res.status(400).send('bad request');
    return;
  }

  const storedLink = await getLink(link);

  if (!storedLink) {
    res.status(404).send('not found');
    return;
  }

  if (!preventRecord) {
    await recordClick(link);
  }
  res.status(200).json({ data: storedLink });
}

async function getLink(random: string): Promise<Link> {
  const { links, close } = await mongoService.connect();

  const link = (await links.findOne({
    random,
  })) as Link;

  await close();

  return link;
}

async function recordClick(random: string): Promise<void> {
  const { clicks, close } = await mongoService.connect();

  const now = new Date();
  const utcDate = `${now.getUTCFullYear()}-${
    now.getUTCMonth() + 1
  }-${now.getUTCDate()}`;

  await clicks.findOneAndUpdate(
    {
      random,
      utcDate,
    },
    {
      $inc: { clicks: 1 },
    },
    {
      upsert: true,
    },
  );

  await close();

  return;
}
