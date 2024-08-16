import type { NextApiRequest, NextApiResponse } from 'next';
import { createNote, getNotes } from '../../../utils/handlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getNotes(req, res);
      break;
    case 'POST':
      await createNote(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
