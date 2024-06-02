import { TUser } from "../user/types";

export class CommentModel {
  id: string;
  content: string;
  createdAt: number;
  user: TUser;
  childComments: CommentModel[];
  like?: boolean;
  numberLike: number;

  constructor() {
    this.id = "";
    this.content = "";
    this.createdAt = new Date().getTime();
    this.user = new TUser();
    this.childComments = [];
    this.numberLike = 10;
  }
}

export class GetCommentByPostResponse {
  comments: CommentModel[];

  constructor() {
    this.comments = [];
  }
}
