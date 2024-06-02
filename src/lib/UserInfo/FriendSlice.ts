import { TUser } from "@/modules/user/types";
import { UserStatus } from "@/utils/contants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialProps {
  friends: TUser[];
  friendsRecommended: TUser[];
}
const friendSliceInitialState: initialProps = {
  friends: [],
  friendsRecommended: [],
};

export const friendSlice = createSlice({
  name: "userInfo",
  initialState: friendSliceInitialState,
  reducers: {
    setFriends(state, action: PayloadAction<TUser[]>) {
      state = {
        ...state,
        friends: action.payload.map((val) => {
          return { ...val, status: UserStatus.Connected };
        }),
      };
      return state;
    },
    setFriendsRecommended(state, action: PayloadAction<TUser[]>) {
      state = {
        ...state,
        friendsRecommended: action.payload.map((val) => {
          return { ...val, status: UserStatus.Connect };
        }),
      };

      return state;
    },
    updateFriendList(state, action: PayloadAction<string>) {
      state = {
        ...state,
        friendsRecommended: state.friendsRecommended.map((val) => {
          if (val.id === action.payload) {
            return { ...val, status: UserStatus.Requested };
          }

          return { ...val, status: UserStatus.Connect };
        }),
      };

      return state;
    },
  },
});

export const { setFriends, setFriendsRecommended, updateFriendList } = friendSlice.actions;
export default friendSlice.reducer;
