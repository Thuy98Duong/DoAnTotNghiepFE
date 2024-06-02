import { ApiInstance } from "..";
import { ResponseListUser, TUser } from "./types";

export const getMe = async (): Promise<TUser | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<TUser>("/user/me");

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getUserById = async (id: string): Promise<TUser | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<TUser>(`/user/${id}`);

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getFriends = async (): Promise<ResponseListUser | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(`/user/friends`);

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getFriendsRecommended =
  async (): Promise<ResponseListUser | null> => {
    try {
      const { data } = await ApiInstance.getInstance().get<any>(
        `/user/friends/recommended`
      );

      return data;
    } catch (err: any) {
      return null;
    }
  };

export const addFollow = async (userId: string): Promise<any | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<any>(
      `/user/follow/${userId}`,
      {}
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const addFriend = async (userId: string): Promise<any | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<any>(
      `/user/add-friend/${userId}`,
      {}
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getFriendProfile = async (id: string): Promise<TUser | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<TUser>(
      `/user/profile/${id}`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const searchUser = async (
  searchString: string
): Promise<ResponseListUser | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(
      `/user/search?searchString=${searchString}`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};
