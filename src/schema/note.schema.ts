import { boolean, object, string, TypeOf } from 'zod';

const payloadBody = {
  user: string({
    required_error: 'user field is required',
  }).min(1, 'user field cannot be empty'),
  title: string({
    required_error: 'title field is required',
  }).min(1, 'title field cannot be empty'),
  text: string({
    required_error: 'text field is required',
  }).min(1, 'text field cannot be empty'),
  completed: boolean().default(false),
};

export const createNoteSchema = object({
  body: object({
    ...payloadBody,
  }),
});

export const updateNoteSchema = object({
  body: object({
    ...payloadBody,
    id: string({
      required_error: 'id field is required',
    }).min(1, 'id field cannot be empty'),
  }),
});

export const deleteNoteSchema = object({
  body: object({
    id: string({
      required_error: 'id field is required',
    }).min(1, 'id field cannot be empty'),
  }),
});

export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
export type DeleteNoteInput = TypeOf<typeof deleteNoteSchema>;
