declare module 'types' {
  import ObjectId from 'mongodb';
  type Link = { _id?: ObjectId; original: string; random: string };
  type StatItem = {
    _id?: ObjectId;
    random: string;
    utcDate: string;
    clicks: number;
  };
}
