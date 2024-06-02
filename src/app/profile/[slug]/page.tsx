/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { General } from "../../General";
import { GroupIcon } from "@/icons/GroupIcon";
import { Avatar, notification } from "antd";
import { PostCreation } from "../../PostCreation";
import { useEffect, useState } from "react";
import { PostCard } from "../../PostCard";
import { ProfileSideBar } from "./ProfileSideBar";
import { useMe } from "@/hooks/UseMe";
import { Button } from "@/components/button";
import { FollowIcon } from "@/icons/Follow";
import { AddFrientIcon } from "@/icons/Follow copy";
import { TUser } from "@/modules/user/types";
import { UserStatus } from "@/utils/contants";
import { useDispatch } from "react-redux";
import { updateFriendList } from "@/lib/UserInfo/FriendSlice";
import { PostHook } from "@/hooks/PostHook";
import { PostDetailModel } from "@/modules/post/types";

export default function ProfileDetail({
  params,
  searchParams,
}: {
  params: { slug: string; [key: string]: string | string[] | undefined };
  searchParams?: { userStatus?: UserStatus };
}) {
  const { onGeProfileById, onAddFriend, onAddFollow } = useMe();
  const { onGetPostProfile } = PostHook();
  const [userInfo, setUserInfo] = useState<TUser>(new TUser());
  const [posts, setPosts] = useState<PostDetailModel[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.slug) {
      onGetUserData(params.slug);
      onGetPostProfile(params.slug, (data) => {
        setPosts(data);
      });
    }
  }, []);

  const onGetUserData = (id: string) => {
    onGeProfileById(id, (data) => {
      setUserInfo({
        ...data,
        status: searchParams?.userStatus || UserStatus.Connect,
      });
    });
  };

  const onAddFriendPress = () => {
    onAddFriend(userInfo.id, () => {
      dispatch(updateFriendList(userInfo.id));
      setUserInfo({
        ...userInfo,
        status: UserStatus.Requested,
      });
      notification.success({
        message: "successful",
        description: `Bạn đã thêm ${
          (userInfo.lastname ?? "") + " " + (userInfo.firstname ?? "")
        } vào bạn bè`,
      });
    });
  };

  const onAddFollowPress = () => {
    onAddFollow(userInfo.id, () => {
      notification.success({
        message: "successful",
        description: `Bạn đã follow ${
          (userInfo.lastname ?? "") + " " + (userInfo.firstname ?? "")
        }`,
      });
    });
  };

  if (!userInfo.id) {
    return null;
  }

  return (
    <General>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col rounded-[10px] bg-white justify-center items-center relative">
          <div className="w-full h-[270px] overflow-hidden">
            <Image
              src="/images/cover-image.jpg"
              width={1000}
              height={1000}
              alt=""
              className="w-full rounded-[10px]"
            />
          </div>
          <div className="flex flex-row gap-[10px] py-[50px] items-center pl-[300px] pr-[100px] w-full">
            <div className="flex flex-col gap-[10px] w-full">
              <div className="text-black text-[20px] font-bold">
                {(userInfo.lastname ?? "") + " " + (userInfo.firstname ?? "")}
              </div>
              <div className="flex flex-row gap-[10px] items-center">
                <GroupIcon />
                <div className="text-[15px] text-[#7D8085] font-bold">
                  180 bạn bè
                </div>
              </div>
            </div>
            <Button
              className="bg-[#ADE2FF] flex flex-row w-[150px]"
              onClick={onAddFollowPress}
            >
              <FollowIcon width={20} height={21} />
              <div className="text-black text-[15px] ml-[10px]">Theo dõi</div>
            </Button>
            <Button
              className="bg-[#ADE2FF] flex flex-row w-[150px]"
              disabled={userInfo.status !== UserStatus.Connect}
              onClick={onAddFriendPress}
            >
              <AddFrientIcon width={20} height={21} />
              <div className="text-black text-[15px] ml-[10px]">
                {userInfo.status === UserStatus.Connect
                  ? "Thêm bạn bè"
                  : "Bạn bè"}
              </div>
            </Button>
          </div>
          <Avatar className="bg-[white] min-w-[200px] w-[200px] h-[200px] cursor-pointer absolute top-[165px] left-[100px]">
            {(userInfo.firstname ?? "") + " " + (userInfo.lastname ?? "")}
          </Avatar>
        </div>
        <div className="flex flex-row gap-[20px] w-full">
          <div className="flex flex-col gap-[20px]">
            <ProfileSideBar slug={params.slug} />
          </div>
          <div className="flex flex-col w-full gap-[20px]">
            {posts &&
              posts.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    posterName={
                      (post.user.firstname ?? "") +
                      " " +
                      (post.user.lastname ?? "")
                    }
                    posterAvatar={post.user.avatar || ""}
                    postedAt={post.createdAt}
                    content={post.content}
                    images={post.image}
                    postId={post.id}
                    likeCount={post.likeCount}
                    isLike={post.isLiked}
                    replyCmtCount={post.replyCmtCount}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </General>
  );
}
