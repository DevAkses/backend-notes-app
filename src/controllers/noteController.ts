import { Request, Response } from 'express';
import * as NoteService from '../models/noteModel';

export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await NoteService.getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
};

export const getNote = async (req: Request, res: Response) => {
    try {
        const note = await NoteService.getNoteById(Number(req.params.id));
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching note' });
    }
};

export const createNote = async (req: Request, res: Response) => {
    try {
        const newNote = await NoteService.createNote(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note' });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        const updatedNote = await NoteService.updateNote(Number(req.params.id), req.body);
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note' });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        await NoteService.deleteNote(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
};
