import {
  DocumentDefinition,
  FilterQuery,
  PipelineStage,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import NoteModel from '../models/note.model';
import { INoteModel } from '../interface/model.interface';
import { INoteResponse } from '../interface/response.interface';
import { INoteRequest } from '../interface/request.interface';

export async function findNote(query: FilterQuery<INoteModel>) {
  const notes = await NoteModel.findOne(query).lean<INoteResponse>().exec();

  return notes;
}

export async function findNotesWithAggregate(pipeline: PipelineStage[]) {
  const notesWithAggregate = await NoteModel.aggregate<INoteResponse>(pipeline);

  return notesWithAggregate;
}

export async function createNewNote(input: DocumentDefinition<INoteRequest>) {
  const newNote = await NoteModel.create({ ...input });

  return newNote;
}

export async function updateNote(
  query: FilterQuery<INoteModel>,
  update: UpdateQuery<INoteRequest>,
  options: QueryOptions = { new: true }
) {
  const updatedNote = await NoteModel.updateOne(query, update, options)
    .lean<INoteResponse>()
    .exec();

  return updatedNote;
}

export async function deleteNote(query: FilterQuery<INoteModel>) {
  const deletedNote = await NoteModel.deleteOne(query);

  return deletedNote;
}
