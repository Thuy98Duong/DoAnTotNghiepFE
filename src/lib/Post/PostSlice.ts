import { PostDetailModel } from "@/modules/post/types";
import { PostType } from "@/utils/contants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TPostType {
  myPost: PostDetailModel[];
  postRecommended: PostDetailModel[];
  postSchool: PostDetailModel[];
  postPersonal: PostDetailModel[];
  postStudy: PostDetailModel[];
}
const initialState: TPostType = {
  myPost: [],
  postRecommended: [],
  postSchool: [],
  postStudy: [],
  postPersonal: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setMyPost(state: TPostType, action: PayloadAction<PostDetailModel[]>) {
      state = { ...state, myPost: action.payload?.reverse() };
      return state;
    },
    updateMyPost(state: TPostType, action: PayloadAction<PostDetailModel>) {
      switch (action.payload.type) {
        case PostType.Personal: {
          state = {
            ...state,
            myPost: [action.payload, ...state.myPost],
            postRecommended: [action.payload, ...state.postRecommended],
            postPersonal: [action.payload, ...state.postPersonal],
          };
          break;
        }
        case PostType.School: {
          state = {
            ...state,
            myPost: [action.payload, ...state.myPost],
            postRecommended: [action.payload, ...state.postRecommended],
            postSchool: [action.payload, ...state.postSchool],
          };
          break;
        }
        case PostType.Study: {
          state = {
            ...state,
            myPost: [action.payload, ...state.myPost],
            postRecommended: [action.payload, ...state.postRecommended],
            postStudy: [action.payload, ...state.postStudy],
          };
          break;
        }

        default: {
          state = {
            ...state,
            myPost: [action.payload, ...state.myPost],
            postRecommended: [action.payload, ...state.postRecommended],
          };
        }
      }
      return state;
    },

    setPostRecommended(
      state: TPostType,
      action: PayloadAction<PostDetailModel[]>
    ) {
      state = { ...state, postRecommended: action.payload?.reverse() };
      return state;
    },

    setPostTypeSchool(
      state: TPostType,
      action: PayloadAction<PostDetailModel[]>
    ) {
      state = { ...state, postSchool: action.payload?.reverse() };
      return state;
    },

    setPostTypePersonal(
      state: TPostType,
      action: PayloadAction<PostDetailModel[]>
    ) {
      state = { ...state, postPersonal: action.payload?.reverse() };
      return state;
    },

    setPostTypeStudy(
      state: TPostType,
      action: PayloadAction<PostDetailModel[]>
    ) {
      state = { ...state, postStudy: action.payload?.reverse() };
      return state;
    },

    deletePost: (state: TPostType, action: PayloadAction<string>) => {
      state = {
        ...state,
        myPost: state.myPost?.filter((val) => val.id !== action.payload),
        postRecommended: state.postRecommended?.filter(
          (val) => val.id !== action.payload
        ),
        postSchool: state.postSchool?.filter(
          (val) => val.id !== action.payload
        ),
        postPersonal: state.postPersonal?.filter(
          (val) => val.id !== action.payload
        ),
        postStudy: state.postStudy?.filter((val) => val.id !== action.payload),
      };
      return state;
    },

    updateLikePost: (
      state: TPostType,
      action: PayloadAction<{ postId: string; like: boolean }>
    ) => {
      state = {
        ...state,
        myPost: state.myPost?.map((val) => {
          if (val.id === action.payload.postId) {
            return {
              ...val,
              isLiked: action.payload.like,
              likeCount: action.payload.like ? val.likeCount + 1 : val.likeCount - 1,
            };
          }
          return val;
        }),
        postRecommended: state.postRecommended?.map((val) => {
          if (val.id === action.payload.postId) {
            return {
              ...val,
              isLiked: action.payload.like,
              likeCount: action.payload.like ? val.likeCount + 1 : val.likeCount - 1,
            };
          }
          return val;
        }),
        postSchool: state.postSchool?.map((val) => {
          if (val.id === action.payload.postId) {
            return {
              ...val,
              isLiked: action.payload.like,
              likeCount: action.payload.like ? val.likeCount + 1 : val.likeCount - 1,
            };
          }
          return val;
        }),
        postPersonal: state.postPersonal?.map((val) => {
          if (val.id === action.payload.postId) {
            return {
              ...val,
              isLiked: action.payload.like,
              likeCount: action.payload.like ? val.likeCount + 1 : val.likeCount - 1,
            };
          }
          return val;
        }),
        postStudy: state.postStudy?.map((val) => {
          if (val.id === action.payload.postId) {
            return {
              ...val,
              isLiked: action.payload.like,
              likeCount: action.payload.like ? val.likeCount + 1 : val.likeCount - 1,
            };
          }
          return val;
        }),
      };
      return state;
    },
  },
});

export const {
  setMyPost,
  updateMyPost,
  setPostRecommended,
  deletePost,
  setPostTypePersonal,
  setPostTypeSchool,
  setPostTypeStudy,
  updateLikePost,
} = postSlice.actions;
export default postSlice.reducer;
