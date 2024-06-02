import { cabinFont } from "@/app/fonts";
import { ArrowDownIcon } from "@/icons/ArrowDown";
import { Button as AntdButton, Dropdown, MenuProps, Space } from "antd";

interface DropdownProps {
  itemSelected: ItemType;
  children?: React.ReactNode;
  onClick?: (val: ItemType) => void;
  className?: string;
  contentClassName?: string;
  trigger: "click" | "hover";

  items: MenuProps["items"];
}

export interface ItemType {
  label: string;
  key: any;
}

export const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const onClick: MenuProps["onClick"] = ({ key }) => {
    const itemFind: any = props.items?.find((val) => val?.key == key);
    if (itemFind) {
      props.onClick &&
        props.onClick({
          label: itemFind?.label,
          key: itemFind?.key,
        });
    }
  };

  return (
    <Dropdown
      menu={{ items: props.items, onClick }}
      trigger={[props.trigger]}
      className={props.className}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div
            className={`text-black font-medium text-[12px] ${cabinFont.className} ${props.contentClassName}`}
          >
            {props.itemSelected.label}
          </div>
          {ArrowDownIcon({ width: 20, height: 19 })}
        </Space>
      </a>
    </Dropdown>
  );
};
