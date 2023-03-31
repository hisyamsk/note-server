import { string, object, TypeOf } from 'zod';

export const authLoginSchema = object({
  body: object({
    username: string({
      required_error: 'username is required',
    }).min(1, 'username cannot be empty'),
    password: string({
      required_error: 'password is required',
    }).min(1, 'password cannot be empty'),
  }),
});

export type AuthLoginInput = TypeOf<typeof authLoginSchema>;
