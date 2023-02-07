import mongoose from 'mongoose';
import { INoteModel } from '../interface/model.interface';

const NoteSchema = new mongoose.Schema<INoteModel>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
