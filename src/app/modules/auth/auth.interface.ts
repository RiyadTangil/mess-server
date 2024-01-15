import { ENUM_USER_ROLE } from '../../../enums/user';

export type ILoginUser = {
  number: string;
  password: string;
};
export type ICreateMessAccount = {
  name: string;
  number: string;
  role: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  data?: any;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
