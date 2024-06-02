"use client";
import { General } from "../General";
import { UserInfo } from "../UserInfo";
import { Menu } from "../Menu";
import { PostCard } from "../PostCard";
import { FriendList } from "../FriendList";
import { DiscussCreation } from "./DiscussCreation";
import { useEffect, useState } from "react";
import { OutStanding } from "./OustandingStudent";
import { MenuTabsExchange } from "./MenuTabsExchange";
import { TRootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { PostDetailModel } from "@/modules/post/types";
import { PostHook } from "@/hooks/PostHook";
import { TabItemType } from "@/components/tabs";
import { PostType } from "@/utils/contants";

export default function Home() {
  const { postStudy, postSchool } = useSelector(
    (state: TRootState) => state.post
  );
  const { friends } = useSelector((state: TRootState) => state.friendInfo);

  const { onGetPostTypeStudy, onGetPostTypeSchool } = PostHook();
  const [posts, setPosts] = useState<PostDetailModel[]>([]);
  const [tabSelected, setTabSelected] = useState<PostType | string | undefined>(
    undefined
  );
  const [outStandingItems, setOutStandingItems] = useState([
    {
      order: 1,
      name: "Trần Thị Lý Diệu",
      likes: 1000,
      images: "/images/avatar.jpg",
    },
    {
      order: 2,
      name: "Trần Thị Lý Diệu",
      likes: 1000,
      images: "/images/avatar.jpg",
    },
    {
      order: 3,
      name: "Trần Thị Lý Diệu",
      likes: 1000,
      images: "/images/avatar.jpg",
    },
  ]);

  useEffect(() => {
    onGetPostTypeStudy((data) => {});
    onGetPostTypeSchool((data) => {});
  }, [tabSelected]);

  useEffect(() => {
    if (!tabSelected || (tabSelected && tabSelected == "All")) {
      setPosts([...postSchool, ...postStudy]);
      return;
    }
    if (tabSelected && tabSelected == PostType.School) {
      setPosts(postSchool);
    }
    if (tabSelected && tabSelected == PostType.Study) {
      setPosts(postStudy);
    }
  }, [postStudy, postSchool, tabSelected]);

  return (
    <General>
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <UserInfo />
          <Menu />
        </div>
        <div className="flex flex-col gap-[20px] w-full">
          <DiscussCreation />
          <MenuTabsExchange onChangeTab={setTabSelected} />
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
          <OutStanding items={outStandingItems} />
          {friends.length > 0 && (
            <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
              Đang hoạt động
            </div>
          )}
          <FriendList />
        </div>
      </div>
    </General>
  );
}
