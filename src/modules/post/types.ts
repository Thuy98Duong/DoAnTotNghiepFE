import { PostPrimary, PostType } from "@/utils/contants";
import { TUser } from "../user/types";

export class CreatePostReq {
  content: string;
  type: PostType;
  privacy: PostPrimary;
  image: string;

  constructor() {
    this.content = "";
    this.type = PostType.Study;
    this.privacy = PostPrimary.PUBLIC;
    this.image = "";
  }
}
export class CreateCommentReq {
  postId: string;
  content: string;

  constructor() {
    this.postId = "";
    this.content = "";
  }
}

export class PostDetailModel {
  id: string;
  content: string;
  likeCount: number;
  privacy: PostPrimary;
  replyCmtCount: number;
  type: PostType;
  user: TUser;
  createdAt: number;
  image: string;
  isLiked: boolean;

  constructor() {
    this.id = "";
    this.content = "";
    this.likeCount = 0;
    this.privacy = PostPrimary.PUBLIC;
    this.replyCmtCount = 0;
    this.type = PostType.Study;
    this.user = new TUser();
    this.createdAt = new Date().getTime();
    this.image = '';
    this.isLiked = false;
  }
}

export class GetMyPostResponse {
  posts: PostDetailModel[];

  constructor() {
    this.posts = [];
  }
}
