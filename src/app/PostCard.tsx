import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { CommentModal, CommentModalRef } from "@/components/modal/CommentModal";
import { PostHook } from "@/hooks/PostHook";
import { ChatIcon } from "@/icons/ChatIcon";
import { CircleRight } from "@/icons/CircleRight";
import { DeleteIcon } from "@/icons/Delete";
import { HeartFillIcon } from "@/icons/HeartFillIcon";
import { HeartIcon } from "@/icons/HeartIcon";
import { deletePost } from "@/lib/Post/PostSlice";
import { TRootState } from "@/lib/store";
import { CommentModel } from "@/modules/post/comment.types";
import { TUser } from "@/modules/user/types";
import { timeAgo } from "@/utils";
import { Avatar, notification } from "antd";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TPostCardProps = {
  postId: string;
  posterName: string;

  posterAvatar: string;

  postedAt: number; // Unixtime
  likeCount: number;
  isLike: boolean;
  replyCmtCount: number;

  content?: string;

  images?: string[] | string;

  // likes?: number;

  // likedBy?: string[];
};

export const PostCard = ({
  postId,
  posterName,
  posterAvatar,
  postedAt,
  content,
  images,
  isLike,
  replyCmtCount,
  likeCount,
}: TPostCardProps) => {
  const commentModalRef: React.ForwardedRef<CommentModalRef> = useRef(null);
  const userInfo: TUser = useSelector((state: any) => state.userInfo);
  const { myPost, postRecommended } = useSelector(
    (state: TRootState) => state.post
  );

  const [loading, setLoading] = useState<boolean>(false);

  const { onGetCommentByPostId, onLikePost, onUnLikePost } = PostHook();

  const dispatch = useDispatch();

  const onGetComment = (
    id: string,
    onSuccess: (data: CommentModel[]) => void
  ) => {
    onGetCommentByPostId(id, onSuccess);
  };

  const onDeletePost = (id: string) => {
    dispatch(deletePost(id));
  };

  const onRenderViewAdmin = () => {
    if (userInfo?.isAdmin) {
      return (
        <Button
          onClick={() => {
            onDeletePost(postId);
          }}
          type="text"
          className="flex flex-row items-center py-6px gap-[3px]"
        >
          <DeleteIcon />
          <div className="text-[#FB5E48] text-[15px] font-medium">
            Xoá bài viết
          </div>
        </Button>
      );
    }
    return (
      <Button
        onClick={() => {
          commentModalRef.current?.onShow();
        }}
        type="text"
        className="flex flex-row items-center py-6px gap-[3px]"
      >
        <CircleRight />
        <div className="text-black text-[15px] font-medium">Chia sẻ</div>
      </Button>
    );
  };

  const onLikePress = () => {
    setLoading(true);

    if (isLike) {
      onUnLikePost(
        postId,
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);

          notification.error({
            message: "Lỗi!",
            description: "Thao tác không thành công vui lòng thử lại!",
          });
        }
      );
    } else {
      onLikePost(
        postId,
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);

          notification.error({
            message: "Lỗi!",
            description: "Thao tác không thành công vui lòng thử lại!",
          });
        }
      );
    }
  };

  const likeText = useMemo(() => {
    if (isLike) {
      return `Bạn` + (likeCount - 1 > 0 ? ` và ${likeCount} người khác` : "");
    }
    return likeCount > 0 ? `${likeCount} người khác` : "";
  }, [likeCount, isLike]);

  return (
    <>
      <div className="py-[20px] bg-white flex flex-col rounded-[10px]">
        <div className="px-[20px] flex flex-row items-center">
          <Avatar
            className="min-w-[56px] w-[56px] h-[56px]"
            src={
              posterAvatar ? (
                <Image src={posterAvatar} width={56} height={56} alt="avatar" />
              ) : undefined
            }
          >
            {posterName}
          </Avatar>
          <div className="py-[15px] px-[10px] flex flex-col">
            <div className="text-black text-[15px] font-semibold">
              {posterName}
            </div>
            <div className="text-[#120f0fc2] text-[12px]">
              {timeAgo(postedAt)}
            </div>
          </div>
        </div>
        <div className="px-[20px]">
          <div className="text-black font-medium py-[10px]">{content}</div>
          <div className="w-full">
            {images && !Array.isArray(images) && (
              <Image
                className="w-full"
                src={images}
                width={1000}
                height={1000}
                quality={100}
                alt=""
              />
            )}
          </div>
          {likeCount > 0 && (
            <div className="flex flex-row gap-[3px] items-center py-[6px]">
              <HeartFillIcon />
              <div className="text-[12px] text-[#120f0fc2] font-medium">
                {likeText}
              </div>
            </div>
          )}
          <div className="flex flex-row justify-evenly gap-[50px] py-[12px]">
            <div
              onClick={() => {
                if (loading) {
                  return;
                }
                onLikePress();
              }}
              className="flex flex-row items-center py-6px gap-[3px] cursor-pointer"
            >
              <HeartIcon fill={isLike ? "red" : undefined} />
              <div
                className={`${
                  isLike ? "text-[red]" : "text-black"
                }  text-[15px] font-medium`}
              >
                Yêu thích
              </div>
            </div>
            <Button
              onClick={() => {
                // commentModalRef.current?.onShow();
                onGetComment(postId, (data) => {
                  commentModalRef.current?.onSetDataComment(data);
                  commentModalRef.current?.onShow();
                });
              }}
              type="text"
              className="flex flex-row items-center py-6px gap-[3px]"
            >
              <ChatIcon />
              <div className="text-black text-[15px] font-medium">
                Bình luận
              </div>
            </Button>
            {onRenderViewAdmin()}
          </div>
          <div className="flex flex-row gap-[10px] items-center">
            <Avatar
              className="min-w-[56px] w-[56px] h-[56px]"
              src={
                <Image
                  src="/images/avatar.jpg"
                  width={56}
                  height={56}
                  alt="avatar"
                />
              }
            />
            <div className="px-[20px] py-[5px] w-full">
              <Input
                className="rounded-[20px] h-[36px] border-[#665B5B] border-[0.5px]"
                placeholder="Viết bình luận"
              />
            </div>
          </div>
        </div>
      </div>
      <CommentModal ref={commentModalRef} title={"Bình luận"} postId={postId} />
    </>
  );
};
