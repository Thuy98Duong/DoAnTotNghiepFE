import { TUser } from "@/modules/user/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userInfo",
  initialState: new TUser(),
  reducers: {
    setUserInfo(state, action: PayloadAction<TUser>) {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
