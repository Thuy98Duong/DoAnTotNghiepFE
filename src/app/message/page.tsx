"use client";
import { General } from "../General";
import { useEffect, useState } from "react";
import { MessageList } from "./component.tsx/MessageList";
import { ChatModel, MessageContentModel } from "./models/message.model";
import { MessageDetail } from "./component.tsx/MessageDetail";
import { TUser } from "@/modules/user/types";
import { useSelector } from "react-redux";
import { TRootState } from "@/lib/store";
import { getServerEndpoint } from "@/config";
import { io, Socket } from "socket.io-client";

export enum UserStatus {
  InActivew = 0,
  Active = 1,
  DoNotCocur = 2,
}
export enum MessageType {
  Text = 0,
  Image = 1,
  Document = 2,
}
const Message = () => {
  const [messageList, setMessageList] = useState<ChatModel[]>([]);
  const userInfo: TUser = useSelector((state: TRootState) => state.userInfo);

  const [messageFocus, setMessageFocus] = useState<ChatModel | undefined>(
    undefined
  );

  const [valueUdpate, setValueUdpate] = useState<
    MessageContentModel | undefined
  >(undefined);

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  const { friends } = useSelector((state: TRootState) => state.friendInfo);

  useEffect(() => {
    const data = friends.map((val) => {
      return {
        ...val,
        message: [],
      };
    });

    setMessageList([...data]);

    setMessageFocus(data?.[0]);
  }, [friends]);

  useEffect(() => {}, [messageFocus]);

  useEffect(() => {
    onConnectToIO();
  }, []);

  useEffect(() => {
    if (valueUdpate && valueUdpate.message && valueUdpate.userId) {
      const data = messageList.map((item) => {
        if (item.id === valueUdpate.userId) {
          return {
            ...item,
            message: [...item.message, valueUdpate],
          };
        } else {
          return item;
        }
      });
      setMessageList(data);

      if (messageFocus?.id === valueUdpate.userId) {
        setMessageFocus({
          ...messageFocus,
          message: [...messageFocus.message, valueUdpate],
        });
      }
    }
  }, [valueUdpate]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("connect", () => {});

      onListenMessage();
    }

    return () => {
      socket?.on("disconnect", () => {});
    };
  }, [socket]);

  const onConnectToIO = () => {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken") || "";

      const SocketIO = io(getServerEndpoint(), {
        extraHeaders: { Authorization: `${token}` },
      });
      setSocket(SocketIO);
    }
  };

  const onListenMessage = () => {
    if (socket) {
      socket.on("message", (val: MessageContentModel) => {
        setValueUdpate(val);
      });
    }
  };

  const onMessage = (message: string | undefined, id: string) => {
    if (socket && message) {
      socket.emit("message", {
        message: message,
        userId: id,
      });

      // update message
      if (messageFocus && messageFocus.id) {
        const data = messageList.map((item) => {
          if (item.id === messageFocus.id) {
            return {
              ...item,
              message: [
                ...item.message,
                {
                  message: message,
                  userId: userInfo.id,
                },
              ],
            };
          } else {
            return item;
          }
        });
        setMessageList(data);

        setMessageFocus({
          ...messageFocus,
          message: [
            ...messageFocus.message,
            {
              message: message,
              userId: userInfo.id,
            },
          ],
        });
      }
    }
  };

  return (
    <General>
      <div className="flex flex-row rounded-[10px] bg-white shadow-[rgba(0, 0, 0, 0)] shadow-lg h-[80vh]">
        <div className="flex flex-col w-[600px] gap-[20px]">
          <MessageList
            messageData={messageList}
            onItemClick={(val) => {
              setMessageFocus(val);
            }}
            itemSelected={messageFocus}
          />
        </div>
        <div className="flex flex-col gap-[20px] w-full">
          {messageFocus !== undefined && (
            <MessageDetail
              messageData={messageFocus}
              messageList={messageFocus.message}
              onSendMessage={(val) => {
                onMessage(val, messageFocus.id);
              }}
            />
          )}
        </div>
      </div>
    </General>
  );
};

export default Message;
