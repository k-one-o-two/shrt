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
  console.log('entered');
  console.time('short');

  if (req.method !== 'POST' || !req.body) {
    res.status(400).send('bad request');
    return;
  }

  const { url } = JSON.parse(req.body);
  const randomString = generateRandomString();

  console.log('generated');

  await storePair(url, randomString);

  console.log('stored');

  res.status(200).json({ generated: randomString });

  console.timeEnd('short');
}

function generateRandomString() {
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
