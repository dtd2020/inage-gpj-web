import { LocalUserModel } from './local-user';


export interface LoginRequestModel {
  username: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
}

export interface DecodedTokenModel {
  iat: string;
  exp: string;
  user: LocalUserModel
}
