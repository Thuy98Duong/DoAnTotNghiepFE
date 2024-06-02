"use client";
import { useEffect, useState } from "react";
import { General } from "./General";
import { UserInfo } from "./UserInfo";
import { Menu } from "./Menu";
import { PostCreation } from "./PostCreation";
import { PostCard } from "./PostCard";
import { FriendRecommendation } from "./FriendRecommendation";
import { FriendList } from "./FriendList";
import { PostDetailModel } from "@/modules/post/types";
import { useSelector } from "react-redux";
import { TRootState } from "@/lib/store";
import { FriendReuqestConnect } from "./FriendRequesttConnect";

export default function Home() {
  const { postRecommended } = useSelector((state: TRootState) => state.post);
  const { friends } = useSelector((state: TRootState) => state.friendInfo);
  const [posts, setPosts] = useState<PostDetailModel[]>([]);

  useEffect(() => {
    setPosts(postRecommended);
  }, [postRecommended]);

  return (
    <General>
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <UserInfo />
          <Menu />
        </div>
        <div className="flex flex-col gap-[20px] w-full">
          <PostCreation />
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
        <div className="flex flex-col min-w-[290px] gap-[10px]">
          <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
            Lời mời kết bạn
          </div>
          <FriendReuqestConnect />
          <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
            Gợi ý bạn bè
          </div>
          <FriendRecommendation />
          {friends.length > 0 && (
            <>
              <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
                Đang hoạt động
              </div>
              <FriendList />
            </>
          )}
        </div>
      </div>
    </General>
  );
}
