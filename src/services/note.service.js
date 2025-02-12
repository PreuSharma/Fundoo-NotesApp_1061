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
        console.log("updated user");
        const data = await Note.findByIdAndUpdate(_id,body,{new: true , runValidators: true});
        return data;
    } catch (error) {
        return {error: error.message};
    }
};


export const deleteNotes = async (_id) => {
    try{
    const note = await Note.findById(_id);
    if(note.isTrash){
        let data = await Note.findByIdAndUpdate(_id,
            {isTrash: false},
            {new:true}   
        )
        return data;
    }
    else{
        let data = await Note.findByIdAndUpdate(_id,
            {isTrash: true},
            {new:true}
        )
        return data;
    }
    }
    catch (error)
    {
        return {error: error.message };
    }
}