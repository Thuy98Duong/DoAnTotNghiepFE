/* eslint-disable react/display-name */
import { Avatar, Image, UploadFile } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { Popup } from ".";
import { useSelector } from "react-redux";
import { Input } from "../input";
import { CommentCard } from "../comment/commentCard";
import { PostHook } from "@/hooks/PostHook";
import { CreateCommentReq } from "@/modules/post/types";
import { isEmpty } from "@/utils";
import { CommentModel } from "@/modules/post/comment.types";
import { TUser } from "@/modules/user/types";

interface CreatePostProps {
  ref: React.ForwardedRef<CommentModalRef>;
  title: string;
  postId: string;
}

export interface CommentModalRef {
  onShow: () => void;
  onSetDataComment: (data: CommentModel[]) => void;
}

export const CommentModal = React.forwardRef<CommentModalRef, CreatePostProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => {
      return {
        onShow: () => {
          onShow();
        },
        onSetDataComment: (data) => {
          setDataComment(data?.slice().reverse());
        },
      };
    });

    const userInfo: TUser = useSelector((state: any) => state.userInfo);
    const [open, setOpen] = useState<boolean>(false);
    const [dataComment, setDataComment] = useState<CommentModel[]>([]);
    const [content, setContent] = useState<string | undefined>(undefined);

    const { onCreateComment, onGetCommentByPostId } = PostHook();

    useEffect(() => {
      let timer: any = null;
      if (open) {
        timer = setInterval(() => {
          onGetComment();
        }, 2000);
      } else {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const onGetComment = () => {
      onGetCommentByPostId(
        props.postId,
        (val) => {
          setDataComment([...val?.slice().reverse()]);
        },
        true
      );
    };

    const onShow = () => {
      setOpen(true);
    };

    const onClearData = () => {
      setContent(undefined);
      setDataComment([]);
    };

    const onHide = () => {
      setTimeout(() => {
        onClearData();
        setOpen(false); 
      });
    };

    const onSubmit = () => {
      if (isEmpty(content)) {
        return;
      }

      const req: CreateCommentReq = {
        postId: props.postId,
        content: content || "",
      };
      onCreateComment(req, () => {
        setDataComment([
          {
            ...new CommentModel(),
            id: new Date().getTime().toString(),
            content: content || "",
            user: userInfo,
          },
          ...dataComment,
        ]);
        setContent(undefined);
      });
    };

    return (
      <Popup title={props.title} open={open} onCancel={onHide}>
        <div>
          <div className="px-[20px] flex flex-row gap-[10px] items-center">
            <div className="py-[12px] px-[11px]">
              <Avatar className="min-w-[40px] w-[40px] h-[40px]" />
            </div>
            <Input
              variant="outlined"
              className="w-full rounded-[20px] h-[37px] py-[5px]"
              placeholder="Viết nội dung"
              value={content}
              onChange={(val) => setContent(val)}
              onKeyPress={(val) => {
                if (String(val || "").toUpperCase() === "ENTER") {
                  onSubmit();
                }
              }}
            />
          </div>
          <div className="mt-2">
            {dataComment.map((item, index) => {
              return (
                <div key={index}>
                  <CommentCard key={item.id} commentData={item} />
                  <div className="ml-[100px]">
                    {item.childComments?.length > 0 &&
                      item.childComments.map((val, index) => {
                        return <CommentCard key={val.id} commentData={val} />;
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Popup>
    );
  }
);
