import { cabinFont } from "@/app/fonts";
import { Modal, ModalFuncProps } from "antd";

interface ModalProps extends ModalFuncProps {
  children?: React.ReactNode;
}

export const Popup: React.FC<ModalProps> = (props) => {
  return (
    <Modal
      {...props}
      footer={props.footer || null}
      closeIcon={props.closeIcon || null}
      width={props.width || 979}
      title={null}
    >
      <div className="py-[20px] px-[30px]">
        <div
          className={`text-black font-medium text-[20px] text-center border-b pb-2 ${cabinFont.className}`}
        >
          {props.title}
        </div>

        <div className="pt-3">{props.children}</div>
      </div>
    </Modal>
  );
};
