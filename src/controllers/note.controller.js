/* eslint-disable prettier/prettier */
import * as NoteService from '../services/note.service';
import HttpStatus from 'http-status';

export const createNote = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const data = await NoteService.createNote(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while creating the note.',
      error: error.message
    });
  }
};
