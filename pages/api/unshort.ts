import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoService } from '@/services/mongo';

type Link = {
  original: string;
  random: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400);
    return;
  }

  const { link, preventRecord } = JSON.parse(req.body);

  if (!/^[a-f0-9]{32}$/.test(link)) {
    res.status(400);
    return;
  }

  const storedLink = await getLink(link);

  if (!storedLink) {
    res.status(404);
    return;
  }

  if (!preventRecord) {
    await recordClick(link);
  }
  res.status(200).json({ data: storedLink });
}

async function getLink(random: string) {
  const { links, close } = await mongoService.connect();

  const link = await links.findOne({
    random,
  });

  close();

  return link;
}

async function recordClick(random: string) {
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

  close();

  return;
}
