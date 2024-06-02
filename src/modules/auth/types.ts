export type TLoginResult = {
  accessToken: string;
};

export type TCheckEmailExistedResult = {
  isExisted: boolean;
};

export type TRegisterPayload = {
  firstname: string;
  gender: string;
  mail: string;
  BOD: number;
  lastname: string;
  password: string;
};
