import { UserStatus } from "@/utils/contants";

export class TUser {
  id: string;
  userId?: string;
  firstname: string;
  gender: string;
  mail: string;
  lastname: string;
  BOD: number;
  status?: UserStatus;
  isAdmin?: boolean;
  avatar?: string;
  constructor() {
    this.id = "";
    this.firstname = "";
    this.gender = "";
    this.mail = "";
    this.lastname = "";
    this.BOD = new Date().getTime();
    this.status = UserStatus.Connect;
  }
}

export class ResponseListUser {
  users: TUser[];

  constructor() {
    this.users = [];
  }
}
