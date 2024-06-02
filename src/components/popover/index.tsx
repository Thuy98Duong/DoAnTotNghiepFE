import { Popover } from "antd";
import { CSSProperties, useMemo, useState } from "react";

type TPopoverProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "bottomRight"
    | "bottomLeft";
  trigger?: "click" | "hover";

  className?: string;

  arrow?: "show" | "hide" | "center";
  overlayInnerStyle?: CSSProperties;
};

export const SnsPopover = ({
  content,
  children,
  placement,
  trigger,
  className,
  arrow,
  overlayInnerStyle,
}: TPopoverProps) => {
  const mergedArrow = useMemo(() => {
    if (arrow === "hide") {
      return false;
    }

    if (arrow === "show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <Popover
      content={content}
      placement={placement}
      trigger={trigger}
      className={className}
      arrow={mergedArrow}
      overlayInnerStyle={overlayInnerStyle}
    >
      {children}
    </Popover>
  );
};
