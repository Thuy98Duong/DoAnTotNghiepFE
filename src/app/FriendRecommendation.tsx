import { useMe } from "@/hooks/UseMe";
import { updateFriendList } from "@/lib/UserInfo/FriendSlice";
import { TRootState } from "@/lib/store";
import { TUser } from "@/modules/user/types";
import { UserStatus } from "@/utils/contants";
import { Avatar, Button, notification } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const FriendRecommendationItem = ({ user }: { user: TUser }) => {
  const userInfo: TUser = useSelector((state: any) => state.userInfo);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onAddFriend } = useMe();
  const dispatch = useDispatch();

  const onNavigateToDetail = () => {
    const params = new URLSearchParams(searchParams);
    if (user.id) {
      params.set("userStatus", user.status || "");
    } else {
      params.delete("userStatus");
    }
    router.push(`profile/${user.id}?${params.toString()}`);
  };

  const onAddFriendPress = () => {
    onAddFriend(user.id, () => {
      dispatch(updateFriendList(user.id));
      notification.success({
        message: "successful",
        description: `Bạn đã thêm ${
          (user.lastname ?? "") + " " + (user.firstname ?? "")
        } vào bạn bè`,
      });
    });
  };

  return (
    <div className="flex flex-row items-center gap-[5px] p-[10px] cursor-pointer">
      <Avatar
        className="min-w-[56px] w-[56px] h-[56px]"
        onClick={() => onNavigateToDetail()}
        // src={
        //   <Image src="/images/avatar.jpg" width={56} height={56} alt="avatar" />
        // }
      >
        {(user.lastname ?? "") + " " + (user.firstname ?? "")}
      </Avatar>
      <div
        className="flex flex-col gap-[10px] justify-center w-full"
        onClick={() => onNavigateToDetail()}
      >
        <div className="text-[14px] text black font-medium">
          {(user.lastname ?? "") + " " + (user.firstname ?? "")}
        </div>
        <div className="text-[12px] text-[#665b5b7d]">Gợi ý bạn bè</div>
      </div>
      {!userInfo?.isAdmin && (
        <Button
          className={`rounded-[10px] border-none ${
            user.status !== UserStatus.Connect
              ? "bg-[grey] hover-none"
              : "bg-[#E4F2FB]"
          }`}
          disabled={user.status !== UserStatus.Connect}
          onClick={() => {
            onAddFriendPress();
          }}
        >
          {user.status === UserStatus.Connect ? "Kết nối" : "Đã gửi"}
        </Button>
      )}
    </div>
  );
};

export const FriendRecommendation = () => {
  const { friendsRecommended } = useSelector(
    (state: TRootState) => state.friendInfo
  );

  return (
    <div className="px-[10px] py-[10px] bg-white rounded-[10px] flex flex-col gap-[10px] text-black">
      {/* <FriendRecommendationItem /> */}
      {friendsRecommended.map((val) => {
        return <FriendRecommendationItem key={val.id} user={val} />;
      })}
    </div>
  );
};
