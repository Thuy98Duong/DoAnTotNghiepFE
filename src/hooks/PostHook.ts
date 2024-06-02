/* eslint-disable react-hooks/exhaustive-deps */
import { setLoading } from "@/lib/AppInfo/AppInfoSlice";
import {
  setMyPost,
  setPostRecommended,
  setPostTypePersonal,
  setPostTypeSchool,
  setPostTypeStudy,
  updateLikePost,
} from "@/lib/Post/PostSlice";
import { CommentModel } from "@/modules/post/comment.types";
import {
  LikePost,
  UnLikePost,
  createComment,
  createPost,
  getCommentByPostId,
  getMyPost,
  getPostForFriend,
  getPostTypePersonal,
  getPostTypeSchool,
  getPostTypeStudy,
  getRecommened,
  searchPost,
} from "@/modules/post/post.repository";
import {
  CreateCommentReq,
  CreatePostReq,
  PostDetailModel,
} from "@/modules/post/types";
import { PostType } from "@/utils/contants";
import React from "react";
import { useDispatch } from "react-redux";

export const PostHook = () => {
  const dispatch = useDispatch();

  const onGetCommentByPostId = React.useCallback(
    async (
      id: string,
      onSuccess: (data: CommentModel[]) => void,
      hideSpinner?: boolean
    ) => {
      if (!hideSpinner) {
        dispatch(setLoading(true));
      }
      try {
        const data = await getCommentByPostId(id);

        if (data) {
          onSuccess(data.comments);
        }
        dispatch(setLoading(false));
      } catch (e) {
        dispatch(setLoading(false));
      }
    },
    []
  );

  const onCreatePost = React.useCallback(
    async (
      req: CreatePostReq,
      onSuccess: () => void,
      onFailed?: () => void
    ) => {
      dispatch(setLoading(true));
      try {
        const data = await createPost(req);

        onSuccess();
        dispatch(setLoading(false));
      } catch (e) {
        dispatch(setLoading(false));
        onFailed && onFailed();
      }
    },
    []
  );

  const onCreateComment = React.useCallback(
    async (
      req: CreateCommentReq,
      onSuccess: () => void,
      onFailed?: () => void
    ) => {
      dispatch(setLoading(true));
      try {
        const data = await createComment(req);

        onSuccess();
        dispatch(setLoading(false));
      } catch (e) {
        dispatch(setLoading(false));
        onFailed && onFailed();
      }
    },
    []
  );

  const onGetMyPost = React.useCallback(
    async (onSuccess?: (data: any) => void, onFailed?: () => void) => {
      try {
        const data = await getMyPost();
        if (data) {
          dispatch(setMyPost(data.posts));
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onGetPostRecommend = React.useCallback(
    async (
      type?: PostType,
      onSuccess?: (data: any) => void,
      onFailed?: () => void
    ) => {
      try {
        const data = await getRecommened(type);
        if (data) {
          dispatch(setPostRecommended(data.posts));
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onGetPostTypeStudy = React.useCallback(
    async (onSuccess?: (data: any) => void, onFailed?: () => void) => {
      try {
        const data = await getPostTypeStudy();
        if (data) {
          dispatch(setPostTypeStudy(data.posts));
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onGetPostTypePersonal = React.useCallback(
    async (onSuccess?: (data: any) => void, onFailed?: () => void) => {
      try {
        const data = await getPostTypePersonal();
        if (data) {
          dispatch(setPostTypePersonal(data.posts));
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onGetPostTypeSchool = React.useCallback(
    async (onSuccess?: (data: any) => void, onFailed?: () => void) => {
      try {
        const data = await getPostTypeSchool();
        if (data) {
          dispatch(setPostTypeSchool(data.posts));
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onGetPostProfile = React.useCallback(
    async (
      userId: string,
      onSuccess?: (data: PostDetailModel[]) => void,
      onFailed?: () => void
    ) => {
      try {
        const data = await getPostForFriend(userId);
        if (data) {
          dispatch(setPostTypeSchool(data.posts));
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onLikePost = React.useCallback(
    async (
      postId: string,
      onSuccess?: (data: any) => void,
      onFailed?: () => void
    ) => {
      try {
        const data = await LikePost(postId);

        if (data && data?.success) {
          dispatch(updateLikePost({ postId: postId, like: true }));
          onSuccess && onSuccess(data);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    []
  );

  const onUnLikePost = React.useCallback(
    async (
      postId: string,
      onSuccess?: (data: any) => void,
      onFailed?: () => void
    ) => {
      try {
        const data = await UnLikePost(postId);
        if (data && data?.success) {
          dispatch(updateLikePost({ postId: postId, like: false }));
          onSuccess && onSuccess(data);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    [dispatch]
  );

  const onSearchPost = React.useCallback(
    async (
      keyword: string,
      onSuccess?: (data: PostDetailModel[]) => void,
      onFailed?: () => void
    ) => {
      try {
        const data = await searchPost(keyword);
        if (data) {
          onSuccess && onSuccess(data.posts);
        } else {
          onFailed && onFailed();
        }
      } catch (e) {
        onFailed && onFailed();
      }
    },
    []
  );

  return {
    onGetCommentByPostId,
    onCreatePost,
    onCreateComment,
    onGetMyPost,
    onGetPostRecommend,
    onGetPostTypeSchool,
    onGetPostTypeStudy,
    onGetPostTypePersonal,
    onGetPostProfile,
    onLikePost,
    onUnLikePost,
    onSearchPost,
  };
};
