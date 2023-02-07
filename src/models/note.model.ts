import mongoose from 'mongoose';
import { INoteModel } from '../interface/model.interface';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const NoteSchema = new mongoose.Schema<INoteModel>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

NoteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
});

const NoteModel = mongoose.model<INoteModel>('Note', NoteSchema);

export default NoteModel;
