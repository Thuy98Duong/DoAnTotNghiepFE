import { Button as AntdButton } from "antd";

type BtnType = "link" | "text" | "primary" | "default" | "dashed" | undefined;

type ButtonProps = {
  children?: React.ReactNode;
  type?: BtnType;
  onClick?: () => void;
  className?: string;
  height?: string;
  loading?: boolean;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "primary",
  className,
  children,
  loading = false,
  disabled = false,
}) => {
  return (
    <AntdButton
      className={"h-auto " + className}
      onClick={onClick}
      type={type}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </AntdButton>
  );
};
