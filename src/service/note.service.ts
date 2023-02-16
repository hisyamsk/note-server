import { DocumentDefinition, FilterQuery, PipelineStage } from 'mongoose';
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
