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

  const { link } = JSON.parse(req.body);

  if (!/^[a-f0-9]{32}$/.test(link)) {
    res.status(400);
    return;
  }

  const storedLink = await getLink(link);

  console.info(storedLink);

  if (!storedLink) {
    res.status(404);
    return;
  }

  await recordClick(link);
  res.status(200).json({ data: storedLink });
}

async function getLink(random: string) {
  const client = await mongoService.connect();

  const linksCollection = client.db('shrt').collection('links');

  return await linksCollection.findOne({
    random,
  });
}

async function recordClick(random: string) {
  const client = await mongoService.connect();

  const clicksCollection = client.db('shrt').collection('clicks');

  return clicksCollection.insertOne({
    random,
    timestamp: new Date(),
  });
}
