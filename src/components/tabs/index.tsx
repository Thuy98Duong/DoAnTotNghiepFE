import { Button } from "../button";

interface TabProps {
  itemSelected: TabItemType;
  children?: React.ReactNode;
  items: TabItemType[];
  onChange: (val: TabItemType) => void;
}

export interface TabItemType {
  label: string;
  key: any;
  children?: React.ReactNode;
}

export const TabsMenu: React.FC<TabProps> = (props) => {
  const onChange = () => {};

  const isActive = (key: any) => {
    return props.itemSelected.key == key;
  };

  const activeClassName = (key: any) => {
    if (isActive(key)) {
      return "bg-[#E4F2FB] rounded-t-[10px]";
    }
  };

  return (
    <div className="flex flex-row justify-between bg-white p-t-[10px] rounded-t-[10px]">
      {props.items.map((val, index) => {
        return (
          <Button
          onClick={() => props.onChange(val)}
            key={val.key}
            type="text"
            className={`w-full hover:bg-[#E4F2FB!important] hover:rounded-t-[10px] mt-[20px] px-[40px] rounded-[0px] ${activeClassName(val.key)}`}
          >
            {val.label}
          </Button>
        );
      })}
      {props.children}
    </div>
  );
};
