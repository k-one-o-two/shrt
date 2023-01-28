import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import { mongoService } from '@/services/mongo';

type Resp = {
  generated: string;
};

type Link = {
  original: string;
  random: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resp>,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400);
    return;
  }

  const { url } = JSON.parse(req.body);
  const randomString = await generateRandomString();

  await storePair(url, randomString);

  res.status(200).json({ generated: randomString });
}

async function generateRandomString() {
  const bytes = await randomBytes(16);
  const string = bytes.toString('hex');

  return string;
}

async function storePair(original: string, random: string) {
  const client = await mongoService.connect();

  const linksCollection = client.db('shrt').collection('links');

  const link: Link = {
    original,
    random,
  };

  return await linksCollection.insertOne(link);
}

// mongo: k102, qBY3vZTegzWeLp9
