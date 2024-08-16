import type { NextApiRequest, NextApiResponse } from 'next';
import { getNoteById, updateNote, deleteNote } from '../../../utils/handlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getNoteById(req, res);
      break;
    case 'PUT':
      await updateNote(req, res);
      break;
    case 'DELETE':
      await deleteNote(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
