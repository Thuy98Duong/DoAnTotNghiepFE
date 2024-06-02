import { Spin, SpinProps } from "antd";
import { FC } from "react";

interface SpinnerProps extends SpinProps {
  isShow?: boolean;
}

export const Spinner: FC<SpinnerProps> = (props) => {
  return <Spin spinning={props.isShow} fullscreen className="z-[1001!important]" />;
};
