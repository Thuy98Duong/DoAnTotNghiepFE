"use client";
import Image from "next/image";
import { General } from "../General";
import { GroupIcon } from "@/icons/GroupIcon";
import { Avatar } from "antd";
import { UserInfo } from "../UserInfo";
import { Menu } from "../Menu";
import { PostCreation } from "../PostCreation";
import { useEffect, useState } from "react";
import { PostCard } from "../PostCard";
import { ProfileSideNav } from "./ProfileSideNav";
import { useSelector } from "react-redux";
import { TRootState } from "@/lib/store";
import { PostDetailModel } from "@/modules/post/types";

export default function Profile() {
  const { myPost } = useSelector((state: TRootState) => state.post);
  const userInfo = useSelector((state: TRootState) => state.userInfo);
  const [posts, setPosts] = useState<PostDetailModel[]>([]);
  const { friends } = useSelector((state: TRootState) => state.friendInfo);

  useEffect(() => {
    setPosts(myPost);
  }, [myPost]);

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
          <div className="flex flex-col gap-[10px] py-[20px] px-[300px] w-full">
            <div className="text-black text-[20px] font-bold">
              {(userInfo.firstname ?? "") + " " + (userInfo.lastname ?? "")}
            </div>
            <div className="flex flex-row gap-[10px] items-center">
              <GroupIcon />
              <div className="text-[15px] text-[#7D8085] font-bold">
                {friends.length} bạn bè
              </div>
            </div>
          </div>
          <Avatar className="bg-white w-[200px] h-[200px] cursor-pointer absolute top-[165px] left-[100px]">
            <div className="text-xl text-black font-bold">
              {userInfo.firstname ?? ""}
            </div>
          </Avatar>
        </div>
        <div className="flex flex-row gap-[20px] w-full">
          <div className="flex flex-col gap-[20px]">
            <ProfileSideNav />
          </div>
          <div className="flex flex-col w-full gap-[20px]">
            <PostCreation />
            {posts.map((post, index) => {
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
