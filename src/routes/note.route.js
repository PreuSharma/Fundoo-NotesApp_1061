/* eslint-disable prettier/prettier */
import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as NoteController from '../controllers/note.controller';

const router = express.Router();
router.post('', userAuth, NoteController.createNote);
router.put('/:_id', userAuth, NoteController.updateNote);
router.delete('/:_id', userAuth, NoteController.deleteNotes);

export default router;
