import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AppInfo = {
  isLoading: boolean;
};

const initialState = {
  isLoading: false,
};

const appInfoSlice = createSlice({
  name: "appInfo",
  initialState: initialState,
  reducers: {
    setLoading: (state: AppInfo, action: PayloadAction<boolean>) => {
      state = { ...state, isLoading: action.payload };
      return state;
    },
  },
});

export const { setLoading } = appInfoSlice.actions;

export default appInfoSlice.reducer;
