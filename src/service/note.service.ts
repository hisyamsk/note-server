import {
  DocumentDefinition,
  FilterQuery,
  PipelineStage,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import NoteModel from '../models/note.model';
import {
  INoteInput,
  INoteModel,
  INoteResponse,
} from '../interface/model.interface';

export async function findNote(query: FilterQuery<INoteModel>) {
  const notes = await NoteModel.findOne(query).lean().exec();

  return notes;
}

export async function findNotesWithAggregate(pipeline: PipelineStage[]) {
  const notesWithAggregate = await NoteModel.aggregate<INoteResponse>(pipeline);

  return notesWithAggregate;
}

export async function createNewNote(input: DocumentDefinition<INoteInput>) {
  const newNote = await NoteModel.create({ ...input });

  return newNote;
}

export async function updateNote(
  query: FilterQuery<INoteModel>,
  update: UpdateQuery<INoteInput>,
  options: QueryOptions = { new: true }
) {
  const updatedNote = await NoteModel.updateOne(query, update, options)
    .lean()
    .exec();

  return updatedNote;
}

export async function deleteNote(query: FilterQuery<INoteModel>) {
  const deletedNote = await NoteModel.deleteOne(query);

  return deletedNote;
}
