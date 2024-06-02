import { AdminIcon } from "@/icons/Admin";
import { ClockIcon } from "@/icons/ClockIcon";
import { PenIcon } from "@/icons/PenIcon";
import { UserCircleIcon } from "@/icons/UserCircleIcon";
import { TUser } from "@/modules/user/types";
import { Avatar } from "antd";
import Image from "next/image";
import { useSelector } from "react-redux";

export const UserInfo = () => {
  const userInfo: TUser = useSelector((state: any) => state.userInfo);

  const onRenderAdminView = () => {
    if (userInfo?.isAdmin) {
      return (
        <div className="flex flex-row gap-[10px] bg-[#E4F2FB] rounded-[20px] w-full h-[50px]">
          <div className="w-full flex flex-row items-center justify-center">
            <AdminIcon />

            <div className="text-black font-medium text-[12px] ml-[5px]">Admin</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row gap-[10px] bg-[#E4F2FB] rounded-[20px] w-full h-[50px]">
        <div className="w-full flex flex-row gap-[5px] items-center justify-center text-black font-medium text-[12px]">
          <UserCircleIcon width={24} height={24} />
          Sinh Viên
        </div>
        <div className="w-full flex flex-row items-center justify-center text-black font-medium text-[12px]">
          <ClockIcon />
          Khóa 62
        </div>
        <div className="w-full flex flex-row items-center justify-center text-black font-medium text-[12px]">
          <ClockIcon />
          Khóa 62
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-[10px] gap-[10px] bg-white rounded-[10px] w-[320px]">
      <div className="flex flex-row gap-[15px]">
        <Avatar className="min-w-[70px] w-[70px] h-[70px]">
          {userInfo?.firstname}
        </Avatar>
        <div className="flex flex-row items-center gap-[10px] w-full">
          <div className="w-full text-[15px] font-bold text-black">
            {(userInfo?.firstname ?? "") + " " + (userInfo?.lastname ?? "")}
          </div>
          <PenIcon />
        </div>
      </div>
      {onRenderAdminView()}
    </div>
  );
};
