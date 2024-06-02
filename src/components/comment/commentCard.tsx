/* eslint-disable react/display-name */
import { cabinFont } from "@/app/fonts";
import { Avatar } from "antd";
import React, { useImperativeHandle } from "react";
import { Button } from "../button";
import { LikeIcon } from "@/icons/Like";
import { CommentIcon } from "@/icons/Comment";
import { CommentModel } from "@/modules/post/comment.types";

interface CommentCardProps {
  ref: React.ForwardedRef<CommentCardRef>;
  commentData: CommentModel;
}

export interface CommentCardRef {}

export const CommentCard = React.forwardRef<CommentCardRef, CommentCardProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => {
      return {};
    });

    return (
      <div className="bg-[#F5F5F5BA] rounded-[10px] mb-[20px]">
        <div className="px-[20px] flex flex-row gap-[10px]">
          <div className="py-[12px] px-[11px]">
            <Avatar className="min-w-[40px] w-[40px] h-[40px]">
              {(props.commentData?.user?.firstname ?? "") +
                " " +
                (props.commentData?.user?.lastname ?? "")}
            </Avatar>
          </div>
          <div className="w-full">
            <div
              className={`text-black font-medium text-[15px] ${cabinFont.className}`}
            >
              {(props.commentData?.user?.firstname ?? "") +
                " " +
                (props.commentData?.user?.lastname ?? "")}
            </div>
            <div
              className={`text-black font-medium text-[12px] ${cabinFont.className}`}
            >
              {props?.commentData?.content}
            </div>

            <div className="flex flex-row gap-[20px]">
              <div className="flex flex-row gap-[20px] w-full">
                <div className="flex flex-row items-center py-6px gap-[3px]">
                  <LikeIcon fill={props?.commentData?.like ? "red" : "black"} />
                  <div
                    className={`text-black text-[10px] font-medium ml-[5px] ${cabinFont.className}`}
                  >
                    Thích
                  </div>
                </div>
                <Button
                  type="text"
                  className="flex flex-row items-center py-6px gap-[3px]"
                >
                  <CommentIcon />
                  <div
                    className={`text-black text-[10px] font-medium ml-[5px] ${cabinFont.className}`}
                  >
                    Trả lời
                  </div>
                </Button>
              </div>
              <div
                className={`text-black text-[10px] text-right font-medium ml-[5px] min-w-[100px] mr-[50px] ${cabinFont.className}`}
              >
                {props.commentData?.numberLike || 10} lượt thích
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
