import Image from "next/image";

type TSchoolNotificationItemProps = {
  id: string;
  description: string;
  title: string;
  thumbnail: string;
};

const SchoolNotificationItem = ({
  id,
  title,
  description,
  thumbnail,
}: TSchoolNotificationItemProps) => {
  return (
    <div className="flex flex-col p-[5px]">
      <div className="flex flex-col justify-center gap-[5px] py-[20px]">
        <div className="font-semibold text-black">{title}</div>
        <div className="text-[12px] text-black">{description}</div>
      </div>
      <div className="py-[5px]">
        <Image
          width={1000}
          height={1000}
          src={thumbnail}
          className="w-full h-[185px]"
          alt=""
        />
      </div>
    </div>
  );
};

export const SchoolNotificationList = ({
  items,
}: {
  items: TSchoolNotificationItemProps[];
}) => {
  return (
    <div className="flex flex-col gap-[5px] p-[10px] rounded-[10px] bg-white">
      {items.map((item, index) => {
        return <SchoolNotificationItem key={index} {...item} />;
      })}
    </div>
  );
};
