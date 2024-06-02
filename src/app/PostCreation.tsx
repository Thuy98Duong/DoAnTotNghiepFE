import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  CreatePostModal,
  CreatePostRef,
} from "@/components/modal/CreatePostModal";
import { CalendarAddIcon } from "@/icons/CalendarAddIcon";
import { ChatPlusIcon } from "@/icons/ChatPlusIcon";
import { VideoIcon } from "@/icons/VideoIcon";
import { PostType } from "@/utils/contants";
import { dropdownCreatePostItems } from "@/utils/data";
import { Avatar, UploadFile } from "antd";
import Image from "next/image";
import { useRef } from "react";
import { useSelector } from "react-redux";

export const PostCreation = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const createPostRef: React.ForwardedRef<CreatePostRef> = useRef(null);

  return (
    <div className="flex flex-col py-[10px] bg-white rounded-[10px]">
      <div className="px-[20px] flex flex-row gap-[10px] items-center">
        <div className="py-[12px] px-[11px]">
          <Avatar
            className="min-w-[40px] w-[40px] h-[40px]"
            // src={
            //   <Image
            //     src="/images/avatar.jpg"
            //     width={40}
            //     height={40}
            //     alt="avatar"
            //   />
            // }
          >
            {userInfo?.firstname}
          </Avatar>
        </div>
        <Input
          variant="filled"
          className="w-full rounded-[20px]"
          placeholder="Viết nội dung"
          onClick={() => {
            createPostRef.current?.onShow();
          }}
        />
      </div>
      <div className="flex flex-row gap-[10px] justify-center items-center">
        <Button
          type="text"
          className="py-[7px] px-[13px] h-fit"
          onClick={() => {
            createPostRef.current?.onShow();
          }}
        >
          <div className="flex flex-row items-center">
            <div className="p-[6px]">
              <ChatPlusIcon />
            </div>
            <div className="text-[15px] text-black font-medium">Bài viết</div>
          </div>
          <CreatePostModal
            title={"Tạo bài viết"}
            ref={createPostRef}
            onSubmit={(data) => console.log(data)}
            dataDropdown={dropdownCreatePostItems}
            dropDownClassName={"w-[60px]"}
            postType={PostType.Personal}
          />
        </Button>
        <Button type="text" className="py-[7px] px-[13px] h-fit">
          <div className="flex flex-row items-center">
            <div className="p-[6px]">
              <CalendarAddIcon />
            </div>
            <div className="text-[15px] text-black font-medium">Sự kiện</div>
          </div>
        </Button>
        <Button type="text" className="py-[7px] px-[13px] h-fit">
          <div className="flex flex-row items-center">
            <div className="p-[6px]">
              <VideoIcon />
            </div>
            <div className="text-[15px] text-black font-medium">Tin tức</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
