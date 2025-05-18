export type CreateUserParams = {
  name: string;
  email: string;
  profileImage?: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};
