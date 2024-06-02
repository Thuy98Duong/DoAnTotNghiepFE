import { HomeIcon } from "@/icons/HomeIcon";
import { MenuItem } from "./MenuItem";
import { BookOpenIcon } from "@/icons/BookOpenIcon";
import { UserGroupIcon } from "@/icons/UserGroupIcon";
import { DateRangeIcon } from "@/icons/DateRangeIcon";
import { SettingIcon } from "@/icons/SettingIcon";
import { usePathname } from "next/navigation";

const listMenuItems = [
  {
    icon: <HomeIcon />,
    name: "Trang chủ",
    href: "/",
  },
  {
    icon: <BookOpenIcon />,
    name: "Trao đổi học tập",
    href: "/learning-exchange",
  },
  {
    icon: <UserGroupIcon />,
    name: "Nhà trường",
    href: "/school",
  },
  {
    icon: <DateRangeIcon />,
    name: "Sự kiện",
    href: "#",
  },
  {
    icon: <SettingIcon />,
    name: "Cài đặt",
    href: "#",
  },
];

export const Menu = () => {
  const path = usePathname();

  const isSelected = (href?: string) => {
    return path === href;
  };

  return (
    <div className="flex flex-col gap-[10px] py-[30px] px-[20px] bg-white rounded-[10px] w-[320px]">
      {listMenuItems.map((menuItem, index) => {
        return (
          <MenuItem
            key={index}
            icon={menuItem.icon}
            name={menuItem.name}
            selected={isSelected(menuItem.href)}
            href={menuItem.href}
          />
        );
      })}
    </div>
  );
};
