import { PostType } from "@/utils/contants";
import { ApiInstance } from "..";
import { GetCommentByPostResponse } from "./comment.types";
import { CreateCommentReq, CreatePostReq, GetMyPostResponse } from "./types";

export const getCommentByPostId = async (
  postId: string
): Promise<GetCommentByPostResponse | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(
      `/comment/${postId}`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const createPost = async (req: CreatePostReq): Promise<any | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<any>(`/post`, req);

    return data;
  } catch (err: any) {
    return null;
  }
};

export const createComment = async (
  req: CreateCommentReq
): Promise<any | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<any>(`/comment`, req);

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getMyPost = async (): Promise<GetMyPostResponse | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(`/post/my-posts`);

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getRecommened = async (
  type?: PostType
): Promise<GetMyPostResponse | null> => {
  const postType = type ? `?type=${type}` : "";
  try {
    const { data } = await ApiInstance.getInstance().get<any>(
      `/post/recommended${postType}`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getPostTypeSchool = async (
): Promise<GetMyPostResponse | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(
      `/post/recommended?type=school`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const getPostTypePersonal =
  async (): Promise<GetMyPostResponse | null> => {
    try {
      const { data } = await ApiInstance.getInstance().get<any>(
        `/post/recommended?type=personal`
      );

      return data;
    } catch (err: any) {
      return null;
    }
  };


  export const getPostTypeStudy =
  async (): Promise<GetMyPostResponse | null> => {
    try {
      const { data } = await ApiInstance.getInstance().get<any>(
        `/post/recommended?type=study`
      );

      return data;
    } catch (err: any) {
      return null;
    }
  };

  
export const getPostForFriend =
async (userId: string): Promise<GetMyPostResponse | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(
      `/post/user/${userId}`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};

export const LikePost = async (
  postId: string
): Promise<any | null> => {
  try {
    const { data } = await ApiInstance.getInstance().post<any>(`/post/${postId}/like`, {});

    return data;
  } catch (err: any) {
    return null;
  }
};

export const UnLikePost = async (
  postId: string
): Promise<any | null> => {
  try {
    const { data } = await ApiInstance.getInstance().delete<any>(`/post/${postId}/unlike`, {});

    return data;
  } catch (err: any) {
    return null;
  }
};

  
export const searchPost =
async (searchString : string): Promise<GetMyPostResponse | null> => {
  try {
    const { data } = await ApiInstance.getInstance().get<any>(
      `/post/search?searchString=${searchString}`
    );

    return data;
  } catch (err: any) {
    return null;
  }
};
