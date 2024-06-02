/* eslint-disable react/display-name */
import { Avatar, Image, UploadFile, notification } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { Popup } from ".";
import { useDispatch, useSelector } from "react-redux";
import { cabinFont } from "@/app/fonts";
import { DropdownMenu, ItemType } from "../dropdown";
import { TextAreaInput } from "../textArea";
import { UploadButton } from "../upload";
import { UploadIcon } from "@/icons/Upload";
import { Button } from "../button";
import { CloseIcon } from "@/icons/Close";
import { PostHook } from "@/hooks/PostHook";
import { CreatePostReq, PostDetailModel } from "@/modules/post/types";
import { PostPrimary, PostType } from "@/utils/contants";
import { TUser } from "@/modules/user/types";
import { setMyPost, updateMyPost } from "@/lib/Post/PostSlice";
import { TRootState } from "@/lib/store";

interface CreatePostProps {
  ref: React.ForwardedRef<CreatePostRef>;
  title: string;
  postType: PostType;
  isExchangepage?: boolean;
  dataDropdown: ItemType[];
  dropDownClassName?: string;
  onSubmit: ({
    content,
    file,
    key,
  }: {
    content: string | undefined;
    file: UploadFile | undefined;
    key?: any;
  }) => void;
}

export interface CreatePostRef {
  onShow: () => void;
  onSuccess?: () => void;
}

export const CreatePostModal = React.forwardRef<CreatePostRef, CreatePostProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => {
      return {
        onShow: () => {
          onShow();
        },
        onSuccess: () => {
          onHide();
        },
      };
    });

    const dispatch = useDispatch();
    const userInfo: TUser = useSelector((state: TRootState) => state.userInfo);
    const { myPost } = useSelector((state: TRootState) => state.post);
    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<UploadFile | undefined>(undefined);
    const [itemSelected, setItemSelected] = useState<ItemType>(
      props.dataDropdown[0]
    );

    const { onCreatePost } = PostHook();

    const onShow = () => {
      setOpen(true);
    };

    const onClearData = () => {
      setContent(undefined);
      setFile(undefined);
      setItemSelected(props.dataDropdown[0]);
    };

    const onHide = () => {
      setTimeout(() => {
        onClearData();
        setOpen(false);
      });
    };

    const onSubmit = () => {
      props.onSubmit({ content, file, key: itemSelected.key });

      const dataCreatePost: CreatePostReq = {
        content: content || "",
        type: props.isExchangepage ? itemSelected.key : props.postType,
        privacy: props.isExchangepage ? PostPrimary.PUBLIC : itemSelected.key,
        image: file?.preview || "",
      };

      onCreatePost(
        dataCreatePost,
        () => {
          dispatch(
            updateMyPost({
              ...new PostDetailModel(),
              id: new Date().getTime().toString(),
              content: content || "",
              type: props.postType,
              privacy: itemSelected.key,
              user: userInfo,
            })
          );

          onHide();

          notification.success({
            message: "Success",
            description: `Đăng thành công`,
          });
        },
        () => {
          notification.error({
            message: "Failed",
            description: "Thất bại vui lòng thử lại",
          });
        }
      );
    };

    return (
      <Popup title={props.title} open={open} onCancel={onHide}>
        <div>
          <div className="px-[20px] flex flex-row gap-[10px] items-center">
            <div className="py-[12px] px-[11px]">
              <Avatar className="min-w-[56px] w-[56px] h-[56px]">
                {userInfo.firstname + " " + userInfo.lastname}
              </Avatar>
            </div>
            <div>
              <div
                className={`capitalize text-black font-medium text-[15px] text-center mb-2 ${cabinFont.className}`}
              >
                {userInfo.firstname + " " + userInfo.lastname}
              </div>
              <DropdownMenu
                itemSelected={itemSelected}
                trigger={"click"}
                items={props.dataDropdown}
                className={"bg-[#E4F2FB] rounded-[12px] pl-2 pr-1 pt-1 pb-1.5"}
                contentClassName={props.dropDownClassName}
                onClick={(val) => setItemSelected(val)}
              />
            </div>
          </div>

          <div className="mt-2">
            <TextAreaInput
              // variant="filled"
              className="h-[126px!important]"
              placeholder="Nhập nội dung"
              value={content}
              onChange={(val) => setContent(val.target.value)}
            />
          </div>
          {file && (
            <div className="mt-[20px] relative">
              <Image
                src={file.preview}
                alt="image"
                width={"100%"}
                preview={{
                  visible: false,
                  mask: <div />,
                  maskClassName: "hover:hidden",
                }}
              />
              <Button
                onClick={() => setFile(undefined)}
                type="text"
                className="py-[7px] px-[13px] h-fit absolute right-[2%] top-[2%] bg-[#000] opacity-30"
              >
                <CloseIcon fill="#fff" />
              </Button>
            </div>
          )}
          <div className="mt-[10px]">
            <UploadButton
              className="py-[16px] px-[16px] h-fit"
              onSelectFile={(val) => setFile(val)}
            >
              <div className="flex flex-row items-center">
                <div className="pr-[16px]">
                  <UploadIcon />
                </div>
                <div
                  className={`text-[10px] text-black font-medium ${cabinFont.className}`}
                >
                  Thêm ảnh
                </div>
              </div>
            </UploadButton>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Button
              onClick={onHide}
              type="default"
              className="py-[10px] px-[30px] h-fit border-[#ADE2FF] rounded-[10px]"
            >
              <div
                className={`text-[15px] text-black font-medium ${cabinFont.className}`}
              >
                Huỷ bỏ
              </div>
            </Button>

            <Button
              onClick={onSubmit}
              className="py-[10px] px-[30px] h-fit bg-[#ADE2FF] mx-[20px] rounded-[10px]"
            >
              <div
                className={`text-[15px] text-black font-medium ${cabinFont.className}`}
              >
                Đăng bài
              </div>
            </Button>
          </div>
        </div>
      </Popup>
    );
  }
);
