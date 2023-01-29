import { MongoClient } from 'mongodb';
require('dotenv').config();

export const mongoService = {
  connect: async () => {
    console.log('connection starting', process.env.MONGO_URI);
    console.time('connect');
    const uri = process.env.MONGO_URI || '';
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(process.env.MONGO_DB);

    console.timeEnd('connect');
    return {
      links: db.collection(process.env.MONGO_LINKS_COLLECTION || ''),
      clicks: db.collection(process.env.MONGO_CLICKS_COLLECTION || ''),
      close: () => client.close(true),
    };
  },
};
