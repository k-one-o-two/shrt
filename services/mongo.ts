import { MongoClient } from 'mongodb';
require('dotenv').config();

export const mongoService = {
  connect: async () => {
    const uri = process.env.MONGO_URI || '';
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(process.env.MONGO_DB);

    return {
      links: db.collection(process.env.MONGO_LINKS_COLLECTION || ''),
      clicks: db.collection(process.env.MONGO_CLICKS_COLLECTION || ''),
      close: () => client.close(true),
    };
  },
};
