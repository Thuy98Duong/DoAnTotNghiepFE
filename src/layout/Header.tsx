import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { SnsPopover } from "@/components/popover";
import { BellFillIcon } from "@/icons/BellFillIcon";
import { ChatFillIcon } from "@/icons/ChatFillIcon";
import { Avatar } from "antd";
import Image from "next/image";
import { AvatarPopover } from "./components/AvatarPopover";
import { NotificationPopover } from "./components/NotificationPopover";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { setLoading } from "@/lib/AppInfo/AppInfoSlice";

export const Header = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const onNavigateToSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (keyword) {
      params.set("keyword", keyword || "");
      setKeyword(undefined);
    } else {
      params.delete("keyword");
    }

    dispatch(setLoading(true));
    router.push(`search?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#78C1F3] px-[60px] flex flex-row fixed h-[80px] z-[100]">
      <div className="flex flex-row w-full items-center gap-[10px]">
        <Link href="/">
          <Image
            className="p-[10px]"
            src="/images/ntu.png"
            width={60}
            height={60}
            alt="logo"
          />
        </Link>
        <Input
          placeholder="Tìm kiếm"
          className="w-[200px] h-[40px] rounded-[20px]"
          onChange={(val) => {
            setKeyword(val);
          }}
          onKeyPress={(val) => {
            if (String(val || "").toUpperCase() === "ENTER") {
              onNavigateToSearch();
            }
          }}
        />
      </div>
      <div className="flex flex-row w-full items-center gap-[20px] justify-end">
        <Button
          onClick={() => {
            router.push("/message");
          }}
          type="text"
          className="px-[6px] py-[6px] rounded-full"
        >
          <ChatFillIcon />
        </Button>
        <SnsPopover
          content={NotificationPopover()}
          trigger="click"
          placement="bottomRight"
          arrow="hide"
          className="p-[0px]"
          overlayInnerStyle={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Button type="text" className="px-[6px] py-[6px] rounded-full">
            <BellFillIcon />
          </Button>
        </SnsPopover>
        <div className="p-[6px]">
          <SnsPopover
            content={AvatarPopover()}
            trigger="click"
            placement="bottomRight"
            arrow="hide"
          >
            <Avatar className="w-[60px] h-[60px] cursor-pointer">
              {userInfo?.firstname}

              {/* <Image
                src="/images/avatar.jpg"
                width={60}
                height={60}
                alt="avatar"
              /> */}
            </Avatar>
          </SnsPopover>
        </div>
      </div>
    </div>
  );
};
