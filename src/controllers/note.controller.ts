import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import {
  CreateNoteInput,
  DeleteNoteInput,
  UpdateNoteInput,
} from '../schema/note.schema';
import {
  createNewNote,
  deleteNote,
  findNote,
  findNotesWithAggregate,
  updateNote,
} from '../service/note.service';

// @desc Get all notes
// @route GET /notes
// @access Private
export const getAllNotesHandler = asyncHandler(
  async (_: Request, res: Response) => {
    const notesWithUser = await findNotesWithAggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'username',
        },
        $unwind: '$username',
      },
    ]);
    res.status(StatusCodes.OK).json(notesWithUser);
  }
);

// @desc Create new note
// @route POST /notes
// @access Private
export const createNewNoteHandler = asyncHandler(
  async (req: Request<{}, {}, CreateNoteInput['body']>, res: Response) => {
    const isNoteExist = await findNote({ title: req.body.title });
    if (isNoteExist) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: `title: ${req.body.title} already exist` });

      return;
    }

    const newNote = await createNewNote({ ...req.body });

    res.status(StatusCodes.CREATED).json(newNote);
  }
);

// @desc Update existing note
// @route PATCH /notes
// @access Private
export const updateNoteHandler = asyncHandler(
  async (req: Request<{}, {}, UpdateNoteInput['body']>, res: Response) => {
    const isNoteExist = await findNote({ _id: req.body.id });
    if (!isNoteExist) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Note with id: ${req.body.id} not found!` });

      return;
    }

    const updatedNote = await updateNote({ _id: req.body.id }, req.body);

    res.status(StatusCodes.CREATED).json(updatedNote);
  }
);

// @desc Delete existing note
// @route DELETE /notes
// @access Private
export const deleteNoteHandler = asyncHandler(
  async (req: Request<{}, {}, DeleteNoteInput['body']>, res: Response) => {
    const isNoteExist = await findNote({ _id: req.body.id });
    if (!isNoteExist) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Note with id: ${req.body.id} not found!` });

      return;
    }

    const deletedNote = await deleteNote({ _id: req.body.id });

    res.status(StatusCodes.CREATED).json(deletedNote);
  }
);
