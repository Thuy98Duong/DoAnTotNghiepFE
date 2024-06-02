import { HomeIcon } from "@/icons/HomeIcon";
import { MenuItem } from "../MenuItem";
import { BookOpenIcon } from "@/icons/BookOpenIcon";
import { UserGroupIcon } from "@/icons/UserGroupIcon";
import { DateRangeIcon } from "@/icons/DateRangeIcon";
import { SettingIcon } from "@/icons/SettingIcon";
import { usePathname } from "next/navigation";

const listMenuItems = [
  {
    icon: <HomeIcon />,
    name: "Bài viết",
    href: "/",
  },
  {
    icon: <BookOpenIcon />,
    name: "Bạn bè",
    href: "#",
  },
  {
    icon: <UserGroupIcon />,
    name: "Ảnh",
    href: "#",
  },
  {
    icon: <DateRangeIcon />,
    name: "Video",
    href: "#",
  },
  {
    icon: <SettingIcon />,
    name: "Cài đặt",
    href: "/control",
  },
];

const getHref = (href: string) => {
  if (href === "/") return "/profile";

  return `/profile${href}`;
};

export const ProfileSideNav = () => {
  const path = usePathname();

  const isSelected = (href: string) => {
    return path === getHref(href);
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
            href={getHref(menuItem.href)}
          />
        );
      })}
    </div>
  );
};
