import { TRootState } from "@/lib/store";
import { TUser } from "@/modules/user/types";
import { Avatar, Button } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendListItem = ( {user}: { user: TUser}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onNavigateToDetail = () => {
    const params = new URLSearchParams(searchParams);
    if (user.id) {
      params.set("userStatus", user.status || "");
    } else {
      params.delete("userStatus");
    }
    router.push(`profile/${user.id}?${params.toString()}`);
  };
  return (
    <div
      onClick={onNavigateToDetail}
      className="flex flex-row items-center gap-[5px] p-[10px]  cursor-pointer"
    >
      <Avatar className="min-w-[56px] w-[56px] h-[56px]">
        {(user.firstname ?? "") + " " + (user.lastname ?? "")}
      </Avatar>
      <div className="flex flex-col gap-[10px] justify-center w-full">
        <div className="text-[14px] text black font-medium">
          {(user.firstname ?? "") + " " + (user.lastname ?? "")}
        </div>
      </div>
    </div>
  );
};

export const FriendList = () => {
  const { friends } = useSelector((state: TRootState) => state.friendInfo);

  const [friendList, setFriendList] = useState<TUser[]>([]);

  useEffect(() => {
    setFriendList(friends);
  }, [friends]);
  return (
    <div className="px-[10px] py-[10px] bg-white rounded-[10px] flex flex-col gap-[10px] text-black">
      {friendList.map((item, index) => {
        return <FriendListItem key={index} user={item } />
      })}
    </div>
  );
};
