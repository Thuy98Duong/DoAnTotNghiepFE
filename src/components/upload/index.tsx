import { Upload, UploadFile, UploadProps } from "antd";
import { Button } from "../button";
import { getBase64 } from "@/utils";

type UploadButtonProps = {
  children?: React.ReactNode;
  onSelectFile?: (data: UploadFile) => void;
  className?: string;
};

export const UploadButton: React.FC<UploadButtonProps> = (props) => {
  const handlePreview = async (file: UploadFile) => {
    const dataBase64 = await getBase64(file.originFileObj);
    props.onSelectFile && props.onSelectFile({ ...file, preview: dataBase64 });
  };

  return (
    <Upload
      {...props}
      onChange={(val) => {
        handlePreview(val.file);
        console.log(val);
      }}
      itemRender={() => {
        return <div />;
      }}
    >
      <Button type="text" className={props.className}>
        {props.children}
      </Button>
    </Upload>
  );
};
