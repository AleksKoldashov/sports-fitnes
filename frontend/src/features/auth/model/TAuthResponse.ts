import { IUser } from './IUser';

export type TAuthResponse = {
  access_token: string;
  user: IUser;
};
