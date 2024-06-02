import { notification } from "antd";
import { ApiInstance } from "..";
import {
  TCheckEmailExistedResult,
  TLoginResult,
  TRegisterPayload,
} from "./types";
import { TUser } from "../user/types";

export const login = async (
  email: string,
  password: string
): Promise<TLoginResult | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<TLoginResult>(
      "/auth/login",
      {
        email,
        password,
      }
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const isEmailAlreadyExisted = async (
  mail: string
): Promise<boolean | null> => {
  try {
    const { data } =
      await ApiInstance.getInstance().post<TCheckEmailExistedResult>(
        "/auth/is-email-existed",
        {
          mail,
        }
      );

    return data.isExisted;
  } catch (err: any) {
    return null;
  }
};

export const register = async (
  payload: TRegisterPayload
): Promise<TUser | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<TUser>(
      "/auth/register",
      payload
    );

    return data;
  } catch {
    return null;
  }
};
