import { Input as AntInput } from "antd";

type TInputProps = {
  placeholder?: string;

  type?: "text" | "password";
  value?: any;

  icon?: React.ReactNode;

  className?: string;

  onChange?: (val: any) => void;
  onClick?: () => void;
  onKeyPress?: (val: any) => void;

  variant?: "outlined" | "borderless" | "filled";
};

const getVariantClass = (variant?: "outlined" | "borderless" | "filled") => {
  switch (variant) {
    case "borderless":
      return "bg-white border-none";
    case "filled":
      return "bg-[#0000000A] focus-within:bg-white focus-within:ring focus-within:border-[#1677ff]";
    default:
      return "bg-white border-[1px] border-[rgba(102, 91, 91, 0.76)] hover:border-[#1677ff] hover:border-[#1677ff] transition ease-in-out delay-[0.1s] focus-within:ring focus-within:border-[#1677ff]";
  }
};

export const Input = ({
  placeholder,
  type,
  icon,
  className,
  variant,
  value,
  onChange,
  onClick,
  onKeyPress,
}: TInputProps) => {
  return (
    <div
      className={`flex flex-row gap-[5px] items-center px-[11px] py-[13px] rounded-[10px]
        ${getVariantClass(variant)} 
        ${className} 
        `}
    >
      {icon}
      <AntInput
        value={value}
        variant="borderless"
        className="h-[18px] w-full p-0 rounded-none"
        placeholder={placeholder}
        type={type}
        onChange={(val) => onChange?.(val.target.value)}
        onClick={onClick}
        onKeyUp={(val) => onKeyPress?.(val.key)}
      />
    </div>
  );
};
