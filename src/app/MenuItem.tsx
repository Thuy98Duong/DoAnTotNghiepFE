import { classNames } from "@/utils";
import Link from "next/link";

export type TMenuIconProps = {
  icon: React.ReactNode;

  name: string;

  selected?: boolean;

  href: string;
};

const getBackgrounndClassName = (selected: boolean): string => {
  if (selected) {
    return "bg-[#E4F2FB]";
  }

  return "bg-[#f5f5f5ba]";
};

export const MenuItem = ({
  icon,
  name,
  selected = false,
  href,
}: TMenuIconProps) => {
  return (
    <Link href={href}>
      <div
        className={classNames(
          "flex flex-row px-[10px] rounded-[40px] cursor-pointer h-full",
          getBackgrounndClassName(selected)
        )}
      >
        <div className="px-[18px] py-[22px]">{icon}</div>
        <div className="text-black text-[15px] font-bold h-full w-full flex flex-row items-center">
          {name}
        </div>
      </div>
    </Link>
  );
};
