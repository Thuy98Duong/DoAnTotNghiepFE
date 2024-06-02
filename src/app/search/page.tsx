"use client";
import { useEffect, useState } from "react";
import { General } from "../General";
import { PostDetailModel } from "@/modules/post/types";
import { PostCard } from "../PostCard";
import { PostHook } from "@/hooks/PostHook";
import { useMe } from "@/hooks/UseMe";
import { TUser } from "@/modules/user/types";
import { setLoading } from "@/lib/AppInfo/AppInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { TRootState } from "@/lib/store";

export default function Home({
  searchParams,
}: {
  searchParams?: { keyword?: string };
}) {
  const { onSearchPost } = PostHook();
  const { onSearchFriends } = useMe();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: TRootState) => state.appInfo);

  const [posts, setPosts] = useState<PostDetailModel[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    if (searchParams?.keyword) {
      dispatch(setLoading(true));
      onSearchPost(
        searchParams?.keyword,
        (val) => {
          dispatch(setLoading(false));
          setPosts(val);
        },
        () => {
          dispatch(setLoading(false));
          setPosts([]);
        }
      );
      onSearchFriends(
        searchParams?.keyword,
        (val) => {
          dispatch(setLoading(false));
          setUsers(val);
        },
        () => {
          dispatch(setLoading(false));
          setUsers([]);
        }
      );
    }
  }, [searchParams]);

  const FriendItem = ({ user }: { user: TUser }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onNavigateToDetail = () => {
      const params = new URLSearchParams(searchParams);
      if (user.id) {
        params.set("userStatus", user.status || "");
      } else {
        params.delete("userStatus");
      }
      router.push(`profile/${user.id}?${params.toString()}`);
    };

    return (
      <div
        style={{
          backgroundColor: "rgba(245, 245, 245, 0.73)",
        }}
        className="flex flex-row items-center gap-[5px] p-[10px] cursor-pointer my-[10px] rounded-[10px]"
      >
        <Avatar
          className="min-w-[56px] w-[56px] h-[56px]"
          onClick={() => onNavigateToDetail()}
          // src={
          //   <Image src="/images/avatar.jpg" width={56} height={56} alt="avatar" />
          // }
        >
          {(user.lastname ?? "") + " " + (user.firstname ?? "")}
        </Avatar>
        <div
          className="flex flex-col gap-[10px] justify-center w-full ml-[10px]"
          onClick={() => onNavigateToDetail()}
        >
          <div className="text-[14px] text black font-medium">
            {(user.lastname ?? "") + " " + (user.firstname ?? "")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <General>
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[450px]" />
        </div>
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-white py-[10px] px-[20px] text-[15px] font-normal text-black">
            {"kết quả tìm kiếm của "}
            <span className=" text-[18px] font-bold">{`'${searchParams?.keyword}'`}</span>
          </div>
          {users.length === 0 && posts.length === 0 && !isLoading && (
            <div className="py-[10px] px-[20px]">
              <div className="text-center py-[10px] px-[20px] text-[18px] font-normal text-black">
                {"Không tìm thấy kết quả"}
              </div>
            </div>
          )}

          {users && users.length > 0 && (
            <div className="bg-white py-[10px] px-[20px]">
              <div className="bg-white py-[10px] px-[20px] text-[18px] font-bold text-black">
                {"Mọi người"}
              </div>
              {users.map((user, index) => {
                return <FriendItem key={index} user={user} />;
              })}
            </div>
          )}

          {posts && posts.length > 0 && (
            <>
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
            </>
          )}
        </div>
        <div className="flex flex-col gap-[10px] w-[450px]">
          <div className="w-[450px]" />
        </div>
      </div>
    </General>
  );
}
