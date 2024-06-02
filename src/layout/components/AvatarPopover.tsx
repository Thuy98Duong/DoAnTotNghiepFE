import { SettingIcon } from "@/icons/SettingIcon";
import { SignOutIcon } from "@/icons/SignOut";
import { UserCircleIcon } from "@/icons/UserCircleIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AvatarPopover = () => {
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-[10px] w-[162px]">
      <Link href="/profile">
        <div className="flex flex-row p-[5px] gap-[10px] bg-[#f5f5f5ba] items-center rounded-[10px] w-full cursor-pointer">
          <UserCircleIcon width={24} height={24} />
          <div className="font-medium">Trang cá nhân</div>
        </div>
      </Link>
      <div className="flex flex-row p-[5px] gap-[10px] bg-[#f5f5f5ba] items-center rounded-[10px] w-full cursor-pointer">
        <SettingIcon width={24} height={24} />
        <div className="font-medium">Cài đặt</div>
      </div>
      <div
        className="flex flex-row p-[5px] gap-[10px] bg-[#f5f5f5ba] items-center rounded-[10px] w-full cursor-pointer"
        onClick={onLogout}
      >
        <SignOutIcon width={24} height={24} />
        <div className="font-medium">Đăng xuất</div>
      </div>
    </div>
  );
};
