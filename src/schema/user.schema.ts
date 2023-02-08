import { object, string, array, enum as zodEnum, boolean, TypeOf } from 'zod';

const rolesEnum = zodEnum(['Employee', 'Admin', 'Manager']);

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'username is required',
    }).min(1, 'Username cannot be empty'),
    password: string({
      required_error: 'password is required',
    }).min(6, 'Passowrd must be at least 6 characters long'),
    roles: array(rolesEnum).nonempty({ message: 'Roles cannot be empty' }),
    active: boolean().default(true),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
