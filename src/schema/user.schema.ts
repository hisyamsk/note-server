import { object, string, array, enum as zodEnum, boolean, TypeOf } from 'zod';

const rolesEnum = zodEnum(['Employee', 'Admin', 'Manager']);

const payload = {
  username: string({
    required_error: 'username is required',
  }).min(1, 'Username cannot be empty'),
  roles: array(rolesEnum).nonempty({ message: 'Roles cannot be empty' }),
  active: boolean().default(true),
};

export const createUserSchema = object({
  body: object({
    ...payload,
    password: string({
      required_error: 'password is required',
    }).min(6, 'Passowrd must be at least 6 characters long'),
  }),
});

export const updateUserSchema = object({
  body: object({
    ...payload,
    id: string({
      required_error: 'id field is required',
    }),
    password: string()
      .min(6, 'Password must be at least 6 characters long')
      .optional(),
  }),
});

export const deleteUserSchema = object({
  body: object({
    id: string({
      required_error: 'id filed is required',
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUsersInput = TypeOf<typeof deleteUserSchema>;
