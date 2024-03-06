export interface LoginDto {
  email: string;
  password: string;
}

export type User = {
  email: string;
  isAdmin: boolean;
};
