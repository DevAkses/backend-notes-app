import prisma from '../config/database';

export const getAllNotes = async () => {
    return await prisma.note.findMany();
};

export const getNoteById = async (id: number) => {
    return await prisma.note.findUnique({ where: { id } });
};

export const createNote = async (data: { title: string; body: string }) => {
    return await prisma.note.create({ data });
};

export const updateNote = async (id: number, data: { title?: string; body?: string }) => {
    return await prisma.note.update({ where: { id }, data });
};

export const deleteNote = async (id: number) => {
    return await prisma.note.delete({ where: { id } });
};
