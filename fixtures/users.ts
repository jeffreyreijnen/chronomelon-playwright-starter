export type UserCredentials = {
  username: string;
  password: string;
};

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' } satisfies UserCredentials,
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' } satisfies UserCredentials,
};

export default users;


