/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner } from "@/components/Spinner";
import { PostHook } from "@/hooks/PostHook";
import { useMe } from "@/hooks/UseMe";
// import { MessageHook } from "@/hooks/socketIO";
import { Header } from "@/layout/Header";
import { Main } from "@/layout/Main";
import { TRootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const General = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: TRootState) => state.userInfo);
  const appInfo = useSelector((state: TRootState) => state.appInfo);
  const { getMe, onGetFriends, onGetFriendsRecommended } = useMe();

  // const { SocketIO } = MessageHook();

  const {
    onGetMyPost,
    onGetPostRecommend,
    onGetPostTypePersonal,
    onGetPostTypeStudy,
    onGetPostTypeSchool,
  } = PostHook();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (userInfo.id) {
      onGetPostRecommend();
      onGetFriends();
      onGetFriendsRecommended();
      onGetMyPost();

      onGetPostTypePersonal();
      onGetPostTypeStudy();
      onGetPostTypeSchool();
    }

    // SocketIO.on("connect", () => {
    //   console.log(2223, SocketIO?.id); // x8WIv7-mJelg7on_ALbx
    // });

    return () => {
      // SocketIO.on("disconnect", () => {
      //   // undefined
      // });
      clearInterval(timer);
    };
  }, [userInfo]);

  return (
    <div className="w-full h-full relative">
      <div className="h-[80px]">
        <Header />
      </div>
      <Main>{children}</Main>
      <Spinner isShow={appInfo.isLoading} />
    </div>
  );
};
