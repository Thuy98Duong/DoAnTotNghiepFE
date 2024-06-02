import { TabItemType, TabsMenu } from "@/components/tabs";
import { PostType } from "@/utils/contants";
import { useEffect, useRef, useState } from "react";

type MenuTabsExchangeProps = {
  onChangeTab: (val: PostType | string | undefined) => void;
};

const menuTabs: TabItemType[] = [
  {
    key: "All",
    label: "Tất cả",
  },
  {
    key: PostType.Study,
    label: "Hỏi đáp học tập",
  },
  {
    key: PostType.School,
    label: "Hỏi đáp nhà trường",
  },
];

export const MenuTabsExchange: React.FC<MenuTabsExchangeProps> = (props) => {
  const [tabSelected, setTabSelected] = useState<TabItemType>(menuTabs[0]);

  useEffect(() => {
    props.onChangeTab(tabSelected.key);
  }, [tabSelected]);
  return (
    <div className={"w-full"}>
      <TabsMenu
        itemSelected={tabSelected}
        items={menuTabs}
        onChange={setTabSelected}
      />
    </div>
  );
};
