import express from 'express';
import {
  createNewNoteHandler,
  getAllNotesHandler,
} from '../../controllers/note.controller';
import validateResource from '../../middleware/validateResource';
import { createNoteSchema } from '../../schema/note.schema';

const noteRouter = express.Router();

noteRouter.get('/', getAllNotesHandler);
noteRouter.post('/', validateResource(createNoteSchema), createNewNoteHandler);

export default noteRouter;
