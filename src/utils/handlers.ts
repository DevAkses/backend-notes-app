import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

export const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  const notes = await prisma.note.findMany();
  res.status(200).json(notes);
};

export const getNoteById = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.status(200).json(note);
};

export const createNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }

  const note = await prisma.note.create({
    data: { title, body },
  });

  res.status(201).json(note);
};

export const updateNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, body } = req.body;

  if (!id || !title || !body) {
    return res.status(400).json({ error: 'ID, title, and body are required' });
  }

  const idAsNumber = parseInt(id as string, 10);
  if (isNaN(idAsNumber)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const note = await prisma.note.update({
      where: { id: idAsNumber },
      data: { title, body },
    });

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: 'Note not found' });
  }
};

export const deleteNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const idAsNumber = parseInt(id as string, 10);
  if (isNaN(idAsNumber)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    await prisma.note.delete({
      where: { id: idAsNumber },
    });

    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Note not found' });
  }
};
