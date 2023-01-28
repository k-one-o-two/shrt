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

  //   const { url } = JSON.parse(req.body);
  const stat = await getStat();
  //   console.log(stat);

  res.status(200).json({ stat });
}

async function getStat(random?: string) {
  const client = await mongoService.connect();

  const linksCollection = client.db('shrt').collection('links');

  const aggregation = linksCollection.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$timestamp',
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  for await (const doc of aggregation) {
    console.log(doc);
  }

  return aggregation;
}
