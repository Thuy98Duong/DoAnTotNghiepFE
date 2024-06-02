"use client";
import { Input } from "@/components/input";
import { UnRequireAuth } from "../UnRequiredAuth";
import { fontMedium } from "../fonts";
import Image from "next/image";
import { Checkbox, Form, notification } from "antd";
import Link from "next/link";
import { Button } from "@/components/button";
import { login } from "@/modules/auth/auth.repository";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [loadingLogin, setLoginLoading] = useState(false);
  const [form] = Form.useForm();

  const onButtonClick = () => {
    form.submit();
  };

  const onFormSubmit = async (values: { email: string; password: string }) => {
    setLoginLoading(true);
    const loginResult = await login(values.email, values.password);

    if (loginResult) {
      notification.success({
        message: "Login successful",
        description: "Đăng nhập thành công",
      });

      localStorage.setItem("accessToken", loginResult.accessToken);

      setLoginLoading(false);

      router.push("/");

      return;
    }

    notification.error({
      message: "Đăng nhập thất bại",
      description: "Invalid email or password",
    });

    setLoginLoading(false);
  };

  return (
    <UnRequireAuth>
      <div
        className="flex flex-row items-center justify-center bg-white h-full rounded-[10px]"
        style={{
          boxShadow:
            "9px 9px 10px 0px rgba(0, 0, 0, 0.25), -10px -10px 10px 0px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div
          className="flex flex-col bg-white gap-[10px] h-full"
          style={{ maxHeight: "100%" }}
        >
          <div className="px-[94px] w-full h-[204px]">
            <Image
              src="/images/education.png"
              alt=""
              width={782}
              height={204}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
          <div className="flex flex-col justify-end w-full h-full">
            <Image
              src="/images/login.jpg"
              width={2000}
              height={2000}
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col bg-white text-black px-[30px]">
          <div className="flex flex-row items-center justify-center w-full h-[120px]">
            <Image src="/images/ntu.png" width={120} height={120} alt="" />
          </div>
          <div
            className={`py-[24px] px-[88px] text-center text-[40px] ${fontMedium.className}`}
          >
            Đăng nhập
          </div>
          <Form form={form} onFinish={onFormSubmit}>
            <div className="flex flex-col gap-[20px]">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập email",
                  },
                ]}
              >
                <Input placeholder="Tài khoản/ email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập mật khẩu",
                  },
                ]}
              >
                <Input placeholder="Mật khẩu" type="password" />
              </Form.Item>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-row justify-start p-[4px] w-full">
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </div>
              <div className="flex flex-row items-center justify-end text-[#4188B0] text-[10px] w-full">
                <Link href="#">Quên mật khẩu</Link>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full h-[85px]">
              <Button
                className="bg-[#226597] w-full py-[14px] px-[59px] rounded-[10px] text-white"
                onClick={onButtonClick}
                loading={loadingLogin}
              >
                Đăng nhập
              </Button>
            </div>
            <div className="w-full py-[7px] text-[10px] text-center">
              Bạn chưa có tài khoản?{" "}
              <Link className="text-[#4188B0]" href="/register">
                Đăng ký
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </UnRequireAuth>
  );
}
