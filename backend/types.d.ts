export interface IUser {
  email: string;
  displayName: string;
  password: string;
  token: string;
  role: string;
  googleId?: string;
  avatar: File | string;
}