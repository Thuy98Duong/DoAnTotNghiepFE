import { Button } from "@/components/button";
import { TUser } from "@/modules/user/types";
import { Avatar } from "antd";
import Image from "next/image";
import { useSelector } from "react-redux";

const FriendRequestItem = () => {
  const userInfo: TUser = useSelector((state: any) => state.userInfo);

  return (
    <div className="flex flex-row items-center gap-[5px] p-[10px] mb-[5px]">
      <Avatar
        className="min-w-[56px] w-[56px] h-[56px]"
        src={
          <Image
            src="/images/cover-image.jpg"
            width={56}
            height={56}
            alt="avatar"
          />
        }
      />
      <div className="flex flex-col gap-[10px] justify-center w-full">
        <div className="text-[14px] text black font-medium">
          Nguyễn Thị Thùy Dương
        </div>
        <div className="text-[12px] text-[#665b5b7d]">Gợi ý bạn bè</div>
        {!userInfo?.isAdmin && (
          <div className="flex flex-row items-center gap-[5px]">
            <Button className="bg-[white] text-black min-w-[70px] text-[12px] rounded-[20px] border-[#ADE2FF] border-[1px] hover:text-[black!important] hover:bg-[white!important]">
              Xóa
            </Button>
            <Button className="bg-[#E4F2FB] text-black min-w-[70px] text-[12px] rounded-[20px] border-none hover:text-[black!important] hover:bg-[white!important]">
              Chấp nhận
            </Button>
          </div>
        )}
      </div>

      {/* {!userInfo?.isAdmin && (
        <Button className="bg-[#E4F2FB] rounded-[10px] border-none">
          Kết nối
        </Button>
      )} */}
    </div>
  );
};

export const FriendReuqestConnect = () => {
  return (
    <div className="px-[10px] py-[10px] bg-white rounded-[10px] flex flex-col gap-[10px] text-black">
      <FriendRequestItem />
      <FriendRequestItem />
    </div>
  );
};
