import { FilterQuery } from 'mongoose';
import NoteModel from '../models/note.model';
import { INoteModel } from '../interface/model.interface';

export async function findNotes(query: FilterQuery<INoteModel>) {
  const notes = await NoteModel.find(query).lean().exec();

  return notes;
}
