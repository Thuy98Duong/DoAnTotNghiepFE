import { Input } from "@/components/input";
import {
  CreatePostModal,
  CreatePostRef,
} from "@/components/modal/CreatePostModal";
import { ChatPlusIcon } from "@/icons/ChatPlusIcon";
import { PostType } from "@/utils/contants";
import { dropdownCreateDiscusionItems } from "@/utils/data";
import { Avatar, Button } from "antd";
import Image from "next/image";
import { useRef } from "react";

export const DiscussCreation = () => {
  const createPostRef: React.ForwardedRef<CreatePostRef> = useRef(null);

  return (
    <div className="py-[10px] bg-white rounded-[10px]">
      <div className="px-[20px] flex flex-row gap-[10px] items-center">
        <div className="py-[12px] px-[11px]">
          <Avatar
            className="min-w-[40px] w-[40px] h-[40px]"
            src={
              <Image
                src="/images/avatar.jpg"
                width={40}
                height={40}
                alt="avatar"
              />
            }
          />
        </div>
        <Input
          variant="filled"
          className="w-full rounded-[20px]"
          placeholder="Viết nội dung"
          onClick={() => {
            createPostRef.current?.onShow();
          }}
        />
        <Button
          onClick={() => {
            createPostRef.current?.onShow();
          }}
          className="bg-[#E4F2FB] rounded-[10px] border-none h-full"
        >
          <div className="flex flex-row items-center justify-center text-black text-[15px] font-medium">
            <div className="p-[5px]">
              <ChatPlusIcon />
            </div>
            Thảo luận
          </div>
        </Button>

        <CreatePostModal
          title={"Tạo thảo luận"}
          ref={createPostRef}
          onSubmit={(data) => console.log(data)}
          dataDropdown={dropdownCreateDiscusionItems}
          dropDownClassName={"w-[100px]"}
          postType={PostType.School}
          isExchangepage
        />
      </div>
    </div>
  );
};
