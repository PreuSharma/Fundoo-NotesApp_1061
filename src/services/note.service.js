/* eslint-disable max-len */
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





export const updateNote = async (_id, body) => {
    try{
        const note = await Note.findById(_id);
        if (!note) {
            return { message: 'Note not found' };
        }
        if(note.isTrash === true){
            return {message: 'no notes'};
        }

        // if(body.userId!==note.userId){
        //   return {message: 'You are not Authorized to Update this Note'}
        // }
        console.log('updated user');
        const data = await Note.findByIdAndUpdate(_id,body,{new: true , runValidators: true});
        return data;
    } catch (error) {
        return {error: error.message};
    }
};


export const deleteNotes = async (_id) => {
    try {
      const note = await Note.findById(_id);
  
      // Use ternary operator to toggle isTrash field
      const data = await Note.findByIdAndUpdate(
        _id,
        { isTrash: note.isTrash ? false : true }, // Toggle the isTrash value
        { new: true }
      );
  
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };
  