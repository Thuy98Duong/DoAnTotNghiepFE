import { Avatar } from "antd";
import Image from "next/image";

const getNotificationClassName = (hasRead?: boolean): string => {
  const baseClass =
    "py-[12px] px-[16px] flex flex-row gap-[12px] cursor-pointer";

  if (hasRead) {
    return baseClass;
  }

  return `${baseClass} bg-[#E4F2FB]`;
};

const NotificationItem = ({ hasRead }: { hasRead?: boolean }) => {
  return (
    <div className={getNotificationClassName(hasRead)}>
      <Avatar
        className="w-[60px] h-[60px] cursor-pointer"
        src={
          <Image src="/images/avatar.jpg" width={45} height={45} alt="avatar" />
        }
      />
      <div className="flex flex-col gap-[8px]">
        <div className="font-medium text-black">Quỳnh Như đã bình luận ảnh</div>
        <div className="">“Xinh quá nè má ơi”</div>
        <div className="text-[#7C7C7C] text-[10px]">10 giây trước</div>
      </div>
    </div>
  );
};

export const NotificationPopover = () => {
  return (
    <div className="flex flex-col gap-[1px]">
      <NotificationItem hasRead={false} />
      <NotificationItem hasRead={false} />
      <NotificationItem hasRead={true} />
      <NotificationItem hasRead={true} />
      <NotificationItem hasRead={false} />
    </div>
  );
};
