import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import { mongoService } from '@/services/mongo';
import { Link } from 'types';
require('dotenv').config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        generated: string;
      }
    | string
  >,
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).send('bad request');
    return;
  }

  const { url } = JSON.parse(req.body);
  const randomString = await generateRandomString();

  await storePair(url, randomString);

  res.status(200).json({ generated: randomString });
}

async function generateRandomString() {
  const bytes = randomBytes(Number(process.env.RANDOM_LENGTH) || 0);
  const string = bytes.toString('hex');

  return string;
}

async function storePair(original: string, random: string) {
  const { links, close } = await mongoService.connect();

  const link: Link = {
    original,
    random,
  };

  await links.insertOne(link);
  await close();

  return;
}
