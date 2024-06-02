/* eslint-disable react/display-name */
import { cabinFont } from "@/app/fonts";
import React, { useImperativeHandle, useState } from "react";
import { Input } from "@/components/input";
import { Avatar } from "antd";
import {
  ChatModel,
  MessageContentModel,
  MessageDetailModel,
  MessageItemModel,
} from "../models/message.model";
import { SendIcon } from "@/icons/Send";
import { Button } from "@/components/button";
import { TUser } from "@/modules/user/types";
import { TRootState } from "@/lib/store";
import { useSelector } from "react-redux";

interface MessageDetailProps {
  ref: React.ForwardedRef<MessageDetailRef>;
  messageData: ChatModel;
  messageList: MessageContentModel[];
  onSendMessage: (val: string | undefined) => void;
}

export interface MessageDetailRef {}

export const MessageDetail = React.forwardRef<
  MessageDetailRef,
  MessageDetailProps
>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {};
  });
  const userInfo: TUser = useSelector((state: TRootState) => state.userInfo);

  const [content, setContent] = useState<string | undefined>(undefined);

  const isMe = (userId: string) => {
    return userId === userInfo.id;
  };

  const onGetMessageClassName = (userId: string) => {
    if (isMe(userId)) {
      return "bg-[#ADE2FF]";
    }
    return "bg-[white] border-[1px] border-[#4188B0]";
  };

  const onRenderMessage = () => {
    return (
      <>
        {props.messageList?.map((message, index) => {
          return (
            <div
              key={index}
              className={` flex flex-row mb-[10px] ${
                isMe(message.userId) ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`text-[#120F0FC2] font-[400] text-[17px] max-w-[70%] px-[20px] py-[5px] rounded-[20px] ${
                  cabinFont.className
                } ${onGetMessageClassName(message.userId)}`}
              >
                {message.message}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="w-full h-[-webkit-fill-available] flex flex-col justify-between">
      <div className="w-full border-b-[1px] p-[20px] shadow-[rgba(0, 0, 0, 0.25)] shadow-lg flex items-center">
        <Avatar
          className="min-w-[40px] w-[40px] h-[40px] mr-[10px]"
          src={"/images/avatar.jpg"}
        />
        <div
          className={`text-black font-bold text-[17px] ${cabinFont.className}`}
        >
          {(props.messageData.firstname || "") +
            " " +
            (props.messageData.lastname || "")}
        </div>
      </div>
      <div className="p-[20px]">
        <div
          className="overflow-y-scroll overflow-x-hidden h-[59vh] flex flex-col justify-end"
          style={{ scrollbarWidth: "none", scrollbarColor: "white" }}
        >
          {onRenderMessage()}
        </div>
        <div className="flex flex-row items-center">
          <Input
            placeholder="Nhập tin nhắn"
            className="w-full h-[40px] rounded-[20px] h-[45px]"
            value={content}
            onChange={(val) => setContent(val)}
            onKeyPress={(val) => {
              if (String(val || "").toUpperCase() === "ENTER") {
                if (content) {
                  props.onSendMessage(content);
                  setContent(undefined);
                }
              }
            }}
          />
          <Button
            type="text"
            className="hover:bg-[unset!important]"
            onClick={() => {
              if (content) {
                props.onSendMessage(content);
                setContent(undefined);
              }
            }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
});
