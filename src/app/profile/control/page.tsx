"use client";
import Image from "next/image";
import { General } from "../../General";
import { GroupIcon } from "@/icons/GroupIcon";
import { Avatar, Form } from "antd";
import { ProfileSideNav } from "../ProfileSideNav";
import { cabinFont } from "@/app/fonts";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { DatePicker } from "@/components/datePicker";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface UserInfoModel {
  firstname: string;
  lastname: string;
  gender: string;
  mail: string;
  BOD: number;
  class: string;
  course: string;
}

export default function Profile() {
  const userInfo: UserInfoModel = useSelector((state: any) => state.userInfo);
  const router = useRouter();
  const [form] = Form.useForm();

  const [data, setData] = useState<UserInfoModel>();

  useEffect(() => {
    setData(userInfo);
  }, [userInfo]);

  const onButtonSubmit = () => {
    form.submit();
  };

  console.log(
    data,
    data?.BOD
      ? dayjs(new Date(data?.BOD), "DD-MM-YYYY")
      : dayjs(new Date(), "DD-MM-YYYY"),
    13
  );

  const BOD = useMemo(() => {
    return data?.BOD
      ? dayjs(new Date(data?.BOD), "DD-MM-YYYY")
      : undefined;
  }, [data]);

  return (
    <General>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col rounded-[10px] bg-white justify-center items-center relative">
          <div className="w-full h-[270px] overflow-hidden">
            <Image
              src="/images/cover-image.jpg"
              width={1000}
              height={1000}
              alt=""
              className="w-full rounded-[10px]"
            />
          </div>
          <div className="flex flex-col gap-[10px] py-[20px] px-[300px] w-full">
            <div className="text-black text-[20px] font-bold">
              Trần Thị Lý Diệu
            </div>
            <div className="flex flex-row gap-[10px] items-center">
              <GroupIcon />
              <div className="text-[15px] text-[#7D8085] font-bold">
                180 bạn bè
              </div>
            </div>
          </div>
          <Avatar
            className="w-[200px] h-[200px] cursor-pointer absolute top-[165px] left-[100px]"
            src={
              <Image
                src="/images/avatar.jpg"
                width={200}
                height={200}
                alt="avatar"
              />
            }
          />
        </div>
        <div className="flex flex-row gap-[20px] w-full">
          <div className="flex flex-col gap-[20px]">
            <ProfileSideNav />
          </div>
          <div className="flex flex-col w-full gap-[20px] bg-white rounded-[10px] p-[40px]">
            <div
              className={`text-[20px] text-black font-bold ${cabinFont.className}`}
            >
              Thông tin cá nhân
            </div>

            <Form
              form={form}
              name="global_state"
              layout="vertical"
              onFinish={(val) => console.log(val)}
              fields={[
                {
                  name: ["fullName"],
                  value: (data?.firstname || "") + " " + (data?.lastname || ""),
                },
                {
                  name: ["BOD"],
                  value: BOD,
                },
                {
                  name: ["email"],
                  value: data?.mail,
                },
                {
                  name: ["gender"],
                  value: data?.gender,
                },
                {
                  name: ["class"],
                  value: data?.class,
                },
                {
                  name: ["course"],
                  value: data?.course,
                },
              ]}
            >
              <div className="flex flex-col gap-[20px] p-[30px]">
                <div className="flex flex-row gap-[20px]">
                  <div className="w-5/12">
                    <Form.Item
                      name="fullName"
                      className={`w-[360px] flex flex-col text-black text-[15px!important] ${cabinFont.className}`}
                      label="Họ và tên"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="w-5/12">
                    <Form.Item
                      name="BOD"
                      className={`w-[360px] flex flex-col text-black text-[15px!important] ${cabinFont.className}`}
                      label="Ngày sinh"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="Ngày sinh"
                        value={BOD}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-row gap-[20px]">
                  <div className="w-5/12">
                    <Form.Item
                      name="email"
                      className={`w-[360px] flex flex-col text-black text-[15px!important] ${cabinFont.className}`}
                      label="E-mail"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </div>
                  <div className="w-5/12">
                    <Form.Item
                      name="gender"
                      className={`w-[360px] flex flex-col text-black text-[15px!important] ${cabinFont.className}`}
                      label="Giới tính"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-row gap-[20px]">
                  <div className="w-5/12">
                    <Form.Item
                      name="class"
                      className={`w-[360px] flex flex-col text-black text-[15px!important] ${cabinFont.className}`}
                      label="Khoa"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </div>
                  <div className="w-5/12">
                    <Form.Item
                      name="course"
                      className={`w-[360px] flex flex-col text-black text-[15px!important] ${cabinFont.className}`}
                      label="Khoá học"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="flex flex-row h-[85px]">
                <Button
                  onClick={() => {
                    router.back();
                  }}
                  type="default"
                  className="py-[10px] px-[30px] h-fit border-[#ADE2FF] rounded-[10px]"
                >
                  <div
                    className={`text-[15px] text-black font-medium ${cabinFont.className}`}
                  >
                    Huỷ bỏ
                  </div>
                </Button>
                <Button
                  onClick={onButtonSubmit}
                  className="py-[10px] px-[30px] h-fit bg-[#ADE2FF] mx-[20px] rounded-[10px] w-[120px]"
                >
                  <div
                    className={`text-[15px] text-black font-medium ${cabinFont.className}`}
                  >
                    Lưu
                  </div>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </General>
  );
}
