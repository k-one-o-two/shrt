import { MongoClient, ServerApiVersion } from 'mongodb';
export const mongoService = {
  connect: async () => {
    const uri =
      'mongodb+srv://k102:qBY3vZTegzWeLp9@cluster0.dzt8im3.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    await client.connect;

    const db = client.db('shrt');

    return {
      links: db.collection('links'),
      clicks: db.collection('clicks'),
      close: client.close,
    };
  },
};
