import { Input as AntInput } from "antd";
import { TextAreaProps } from "antd/es/input";
import { FC } from "react";

interface TInputProps extends TextAreaProps {
  containerClassName?: string;

  variant?: "outlined" | "borderless" | "filled";
}

const getVariantClass = (variant?: "outlined" | "borderless" | "filled") => {
  switch (variant) {
    case "borderless":
      return "bg-white border-none";
    case "filled":
      return "bg-[#0000000A]  focus-within:bg-white focus-within:ring focus-within:border-[#1677ff]";
    default:
      return "bg-white border-[1px] border-[rgba(102, 91, 91, 0.76)] hover:border-[#1677ff] hover:border-[#1677ff] transition ease-in-out delay-[0.1s] focus-within:ring focus-within:border-[#1677ff]";
  }
};

export const TextAreaInput: FC<TInputProps> = (props) => {
  const { TextArea } = AntInput;
  return (
    <div
      className={`flex flex-row gap-[5px] items-center px-[20px] py-[20px] rounded-[10px]
        ${getVariantClass(props.variant)} 
        ${props.containerClassName} 
        `}
    >
      <TextArea
        {...props}
        variant="borderless"
        className={`w-full p-0 rounded-none ${props.className}`}
        autoSize
      />
    </div>
  );
};
