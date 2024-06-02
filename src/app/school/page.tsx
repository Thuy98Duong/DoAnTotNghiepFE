"use client";
import { useEffect, useState } from "react";
import { General } from "../General";
import { Menu } from "../Menu";
import { UserInfo } from "../UserInfo";
import { DiscussCreation } from "./DiscussCreation";
import { PostCard } from "../PostCard";
import { OutStanding } from "./OutStandingStudent";
import { SchoolNotificationList } from "./SchoolNotificationList";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "@/lib/store";
import { PostDetailModel } from "@/modules/post/types";
import { PostHook } from "@/hooks/PostHook";
import { TUser } from "@/modules/user/types";

export default function SchoolPage() {
  const { postSchool } = useSelector((state: TRootState) => state.post);
  const userInfo: TUser = useSelector((state: TRootState) => state.userInfo);
  const { onGetPostTypeSchool } = PostHook();
  const [posts, setPosts] = useState<PostDetailModel[]>([]);

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

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Ngày hội tuyển sinh 2024",
      description:
        "Tới ngày hội tuyển sinh rồi, đi tuyển sinh thôi nhỉ.  Chúng ta sẽ cùng nhau đi tuyển sinh thôi",
      thumbnail: "/images/notification.png",
    },
    {
      id: "2",
      title: "Ngày hội tuyển sinh 2024",
      description:
        "Tới ngày hội tuyển sinh rồi, đi tuyển sinh thôi nhỉ.  Chúng ta sẽ cùng nhau đi tuyển sinh thôi",
      thumbnail: "/images/notification.png",
    },
    {
      id: "3",
      title: "Ngày hội tuyển sinh 2024",
      description:
        "Tới ngày hội tuyển sinh rồi, đi tuyển sinh thôi nhỉ.  Chúng ta sẽ cùng nhau đi tuyển sinh thôi",
      thumbnail: "/images/notification.png",
    },
    {
      id: "4",
      title: "Ngày hội tuyển sinh 2024",
      description:
        "Tới ngày hội tuyển sinh rồi, đi tuyển sinh thôi nhỉ.  Chúng ta sẽ cùng nhau đi tuyển sinh thôi",
      thumbnail: "/images/notification.png",
    },
  ]);

  useEffect(() => {
    onGetPostTypeSchool((data) => {
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    setPosts(postSchool);
  }, [postSchool]);

  return (
    <General>
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <UserInfo />
          <Menu />
        </div>
        <div className="flex flex-col gap-[20px] w-full">
          {userInfo.isAdmin == true && <DiscussCreation />}
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
          <OutStanding
            items={outStandingItems}
            title="Học sinh tiêu biểu của học kỳ"
          />
          <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
            Thông báo
          </div>
          <SchoolNotificationList items={notifications} />
        </div>
      </div>
    </General>
  );
}
