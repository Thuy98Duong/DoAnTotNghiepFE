import { setUserInfo } from "@/lib/UserInfo/UserInfoSlice";
import React from "react";
import { useDispatch } from "react-redux";
import {
  getMe as getUserInfo,
  getUserById,
  getFriends,
  addFollow,
  addFriend,
  getFriendsRecommended,
  getFriendProfile,
  searchUser,
} from "@/modules/user/user.repository";
import { TUser } from "@/modules/user/types";
import { setFriends, setFriendsRecommended } from "@/lib/UserInfo/FriendSlice";

export const useMe = () => {
  const dispatch = useDispatch();
  const getMe = React.useCallback(async () => {
    const data = await getUserInfo();

    if (data) {
      const isAdmin = data.mail === "dhnt@ntu.edu.vn" && data.id == "user0";

      dispatch(
        setUserInfo(
          {
            ...data,
            isAdmin: isAdmin,
            firstname: isAdmin
              ? "Trường Đại học Nha Trang"
              : data?.firstname || "",
          } ?? {}
        )
      );
    }
  }, [dispatch]);

  const onGetUserById = React.useCallback(
    async (id: string, onSuccess: (data: TUser) => void) => {
      const data = await getUserById(id);

      if (data) {
        onSuccess(data || new TUser());
      }
    },
    []
  );

  const onGetFriends = React.useCallback(
    async (onSuccess?: (data: TUser[]) => void) => {
      const data = await getFriends();

      if (data) {
        dispatch(setFriends(data.users));
        onSuccess?.(data.users || []);
      }
    },
    [dispatch]
  );

  const onAddFollow = React.useCallback(
    async (id: string, onSuccess?: () => void) => {
      const data = await addFollow(id);

      if (data) {
        onSuccess?.();
      }
    },
    []
  );

  const onAddFriend = React.useCallback(
    async (id: string, onSuccess?: () => void) => {
      const data = await addFriend(id);

      if (data) {
        onSuccess?.();
      }
    },
    []
  );

  const onGetFriendsRecommended = React.useCallback(
    async (onSuccess?: (data: TUser[]) => void) => {
      const data = await getFriendsRecommended();

      if (data) {
        dispatch(setFriendsRecommended(data.users));
        onSuccess?.(data.users || []);
      }
    },
    [dispatch]
  );

  const onGeProfileById = React.useCallback(
    async (id: string, onSuccess: (data: TUser) => void) => {
      const data = await getFriendProfile(id);

      if (data) {
        onSuccess(data || new TUser());
      }
    },
    []
  );

  const onSearchFriends = React.useCallback(
    async (
      keyword: string,
      onSuccess?: (data: TUser[]) => void,
      onFailed?: () => void
    ) => {
      try {
        const data = await searchUser(keyword);

        if (data) {
          onSuccess?.(data.users || []);
        } else {
          onFailed?.();
        }
      } catch (e) {
        onFailed?.();
      }
    },
    []
  );

  return {
    getMe,
    onGetUserById,
    onGetFriends,
    onAddFollow,
    onAddFriend,
    onGetFriendsRecommended,
    onGeProfileById,
    onSearchFriends,
  };
};
