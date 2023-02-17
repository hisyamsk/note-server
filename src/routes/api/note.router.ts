import express from 'express';
import {
  createNewNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
} from '../../controllers/note.controller';
import validateResource from '../../middleware/validateResource';
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from '../../schema/note.schema';

const noteRouter = express.Router();

noteRouter.get('/', getAllNotesHandler);
noteRouter.post('/', validateResource(createNoteSchema), createNewNoteHandler);
noteRouter.patch('/', validateResource(updateNoteSchema), updateNoteHandler);
noteRouter.delete('/', validateResource(deleteNoteSchema), updateNoteHandler);

export default noteRouter;
