import { SocialNetworkTag } from "@/components/socialNetworkTag";
import { Avatar } from "antd";
import Image from "next/image";

type TOutStandingItems = {
  order: number;
  name: string;
  likes: number;
  images: string;
};

type TOutStandingProps = {
  title?: string;

  items?: TOutStandingItems[];
};

const OutStandingItem = ({
  order,
  name,
  likes,
  images,
}: {
  order: number;
  name: string;
  likes: number;
  images: string;
}) => {
  const tagType = (() => {
    switch (order) {
      case 1:
        return "first";
      case 2:
        return "second";
      case 3:
        return "third";
    }
  })();

  return (
    <div className="flex flex-row gap-[10px] py-[10px] px-[10px]">
      <SocialNetworkTag value={order.toString()} type={tagType} />
      <div className="flex flex-row gap-[5px] justify-center">
        <Avatar
          className="min-w-[56px] w-[56px] h-[56px]"
          src={<Image src={images} width={56} height={56} alt="avatar" />}
        />
        <div className="flex flex-col gap-[5px] h-full justify-center">
          <div className="text-black">{name}</div>
          <div className="text-[#665b5b66] text-[12px]">{likes} lượt thích</div>
        </div>
      </div>
    </div>
  );
};

export const OutStanding = ({
  title = "Nổi bật",
  items = [],
}: TOutStandingProps) => {

  return (
    <div className="flex flex-col w-full gap-[10px]">
      <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
        {title}
      </div>
      <div className="rounded-[10px] bg-white py-[10px] px-[20px] text-[15px] font-bold text-black">
        {items.map((item, index) => {
          return (
            <OutStandingItem
              key={index}
              order={item.order}
              name={item.name}
              likes={item.likes}
              images={item.images}
            />
          );
        })}
      </div>
    </div>
  );
};
