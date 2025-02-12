/* eslint-disable prettier/prettier */
import Note from '../models/note.model';
import HttpStatus from 'http-status-codes';

export const createNote = async (body) => {
  // Log the body to check if userId is present
  console.log('Received body:', body);

  // Ensure userId exists in the body
  if (!body.userId) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: "User ID is required"
    };
  }

  // Create the note
  const data = await Note.create(body);

  return {
    code: HttpStatus.CREATED,
    data: data,
    message: "Note created successfully!"
  };
}
