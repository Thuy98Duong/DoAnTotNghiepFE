/* eslint-disable react/display-name */
import { cabinFont } from "@/app/fonts";
import { Avatar, Image, UploadFile } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { getMessageTime } from "@/utils";
import { Button } from "@/components/button";
import { ChatModel, MessageItemModel } from "../models/message.model";
import { Input } from "@/components/input";
import { SearchIcon } from "@/icons/Search";
import { TUser } from "@/modules/user/types";

interface MessageListProps {
  ref: React.ForwardedRef<MessageListRef>;
  messageData: ChatModel[];
  onItemClick: (val: ChatModel) => void;
  itemSelected?: TUser;
}

export interface MessageListRef {}

export const MessageList = React.forwardRef<MessageListRef, MessageListProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => {
      return {};
    });

    const getBackgrounndClassName = (userId: string): string => {
      if (userId === props.itemSelected?.id) {
        return "bg-[#E4F2FB]";
      }

      return "";
    };

    const onRenderMessageList = () => {
      return (
        <>
          {props.messageData.map((message, index) => {
            return (
              <Button
                type="text"
                key={index}
                className={`my-[10px] flex flex-row gap-[10px] items-center w-full ${getBackgrounndClassName(
                  message.id
                )} hover:bg-[#E4F2FB!important]`}
                onClick={() => props.onItemClick(message)}
              >
                <div className="py-[12px] px-[11px]">
                  <Avatar
                    className="min-w-[56px] w-[55px] h-[55px]"
                    // src={message.avatar}
                  >
                    {(message.firstname || "") + " " + (message.lastname || "")}
                  </Avatar>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <div>
                    <div
                      className={`text-black font-medium text-[15px] text-left mb-2 ${cabinFont.className}`}
                    >
                      {(message.firstname || "") +
                        " " +
                        (message.lastname || "")}
                    </div>
                    <div
                      className={`w-full text-[12px] text-[#7D8085] text-left mb-2 ${cabinFont.className}`}
                    >
                      {message?.message?.[message?.message?.length - 1]?.message || "---"}
                    </div>
                  </div>
                  <div
                    className={`text-black font-medium text-[12px] text-right mb-2 ${cabinFont.className}`}
                  >
                    {getMessageTime(new Date().getTime())}
                  </div>
                </div>
              </Button>
            );
          })}
        </>
      );
    };

    return (
      <div
        className="w-full p-[20px] border-r-[1px] border-[#665B5B] h-[-webkit-fill-available]"
        style={{ scrollbarWidth: "thin", scrollbarColor: "white" }}
      >
        <div
          className={`text-black font-bold text-[25px] mb-2 ${cabinFont.className}`}
        >
          {"Tin nhắn"}
        </div>

        <Input
          placeholder="Tìm kiếm"
          className="w-full h-[40px] rounded-[20px]"
          icon={<SearchIcon width={20} height={20} />}
        />
        <div
          className="overflow-y-scroll overflow-x-hidden mt-[10px] h-[64vh]"
          style={{ scrollbarWidth: "none", scrollbarColor: "white" }}
        >
          {onRenderMessageList()}
        </div>
      </div>
    );
  }
);
