import { DatePicker as AntDatePicker } from "antd";
import { ValueType } from "tailwindcss/types/config";

type TDatePickerProps = {
  placeholder?: string;

  icon?: React.ReactNode;
  value?: any;

  onChange?: (date: ValueType, dateString: string | string[]) => void
};

export const DatePicker = ({
  placeholder,
  icon,
  value,
  onChange,
}: TDatePickerProps) => {
  return (
    <div className="flex flex-row gap-[5px] items-center px-[11px] py-[13px] border-[1px] rounded-[10px] border-[rgba(102, 91, 91, 0.76)] hover:border-[#1677ff]">
      {icon}
      <AntDatePicker
        suffixIcon={<></>}
        className={`h-[18px] w-full p-[0px] text-black`}
        variant="borderless"
        placeholder={placeholder}
        onChange={onChange}
        // defaultValue={defaultValue}
        value={value}
      />
    </div>
  );
};
