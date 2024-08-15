import { Router } from 'express';
import * as noteController from '../controllers/noteController';

const router = Router();

router.get('/notes', noteController.getNotes);
router.get('/notes/:id', noteController.getNote);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

export default router;
