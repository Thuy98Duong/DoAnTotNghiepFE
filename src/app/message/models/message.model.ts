import { TUser } from "@/modules/user/types";
import { MessageType, UserStatus } from "../page";

class UserModel extends TUser {
  statusOnline: UserStatus;
  avatar: string;

  constructor() {
    super();
    this.statusOnline = UserStatus.Active;
    this.avatar = '';
  }
}

export interface LatestMessageModel {
  messageId: string;
  message: any;
  messageType: MessageType;
  createAt: number;
}

export interface MessageItemModel {
  user: UserModel;
  latestMessage: LatestMessageModel;
}

export interface MessageDetailModel {
  messageId: string;
  ownerId: string;
  user: UserModel;
  message?: MessageContentModel[];
}
export interface MessageContentModel {
  message?: string;
  userId: string;
}


export class ChatModel extends TUser {
  message: MessageContentModel[];

  constructor() {
    super();
    this.message = [];
  }
}
