import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./UserInfo/UserInfoSlice";
import AppInfoSlice from "./AppInfo/AppInfoSlice";
import PostSlice from "./Post/PostSlice";
import FriendSlice from "./UserInfo/FriendSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userInfo: userInfoSlice,
      appInfo: AppInfoSlice,
      post: PostSlice,
      friendInfo: FriendSlice,
    },
  });
};
export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    appInfo: AppInfoSlice,
    post: PostSlice,
    friendInfo: FriendSlice,
  },
});

// Infer the type of makeStore
export type TAppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<TAppStore["getState"]>;
export type TAppDispatch = TAppStore["dispatch"];
