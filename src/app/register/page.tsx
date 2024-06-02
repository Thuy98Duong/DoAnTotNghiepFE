"use client";
import Image from "next/image";
import { UnRequireAuth } from "../UnRequiredAuth";
import { cabinFont, fontMedium } from "../fonts";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { UserIcon } from "@/icons/UserIcon";
import { CalendarIcon } from "@/icons/CalendarIcon";
import { DatePicker } from "@/components/datePicker";
import { Form, notification, Radio, RadioChangeEvent } from "antd";
import { TRegisterPayload } from "@/modules/auth/types";
import {
  isEmailAlreadyExisted,
  register,
} from "@/modules/auth/auth.repository";
import { useRouter } from "next/navigation";

enum ERegisterStep {
  EMAIL_INPUT = "email-input",
  PASSWORD_INPUT = "password-input",
  OTP_INPUT = "otp-input",
  USER_INFO = "user-info",
  ROLE = "role",
}

export default function Register() {
  const router = useRouter();

  const [step, setStep] = useState<ERegisterStep>(ERegisterStep.EMAIL_INPUT);
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<TRegisterPayload>(
    {} as TRegisterPayload
  );

  const [form] = Form.useForm();

  const onChangeRole = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const onButtonSubmit = () => {
    form.submit();
  };

  const onEmailInputSubmit = async (value: any) => {
    setIsLoading(true);
    const isEmailExisted = await isEmailAlreadyExisted(value.mail);
    setIsLoading(false);

    if (isEmailExisted) {
      notification.error({
        message: "Email already exists",
        description: "Email already exists",
      });

      return;
    }

    payload.mail = value.mail;

    onNextStepClick(ERegisterStep.OTP_INPUT);
  };

  const onPasswordInputSubmit = (value: any) => {
    payload.password = value.password;

    onNextStepClick(ERegisterStep.USER_INFO);
  };

  const onUserInfoSubmit = (value: any) => {
    payload.firstname = value.firstname;
    payload.lastname = value.lastname;
    payload.BOD = new Date(value.BOD).getTime();

    onNextStepClick(ERegisterStep.ROLE);
  };

  const onFinish = async (value: any) => {
    if (step === ERegisterStep.EMAIL_INPUT) {
      await onEmailInputSubmit(value);

      return;
    }

    if (step === ERegisterStep.PASSWORD_INPUT) {
      onPasswordInputSubmit(value);

      return;
    }

    if (step === ERegisterStep.USER_INFO) {
      onUserInfoSubmit(value);

      return;
    }

    setIsLoading(true);
    payload.gender = gender || "female";
    const user = await register({ ...payload, gender: gender || "female" });
    setIsLoading(false);

    if (!user) {
      notification.error({
        message: "Register fail",
        description: "Đăng ký thất bại",
      });

      return;
    }

    notification.success({
      message: "Register success",
      description: "Đăng ký thành công",
    });

    router.push("/login");
  };

  const onNextStepClick = (nextStep: ERegisterStep) => {
    setStep(nextStep);
  };

  return (
    <UnRequireAuth>
      <div
        className="flex flex-row items-center justify-center bg-white h-full rounded-[10px] w-[646px] min-h-[620px]"
        style={{
          boxShadow:
            "9px 9px 10px 0px rgba(0, 0, 0, 0.25), -10px -10px 10px 0px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div className="flex flex-col px-[30px] items-center justify-center w-[403px] h-[498px]">
          <div className="flex flex-row items-center justify-center w-full h-[120px]">
            <Image src="/images/ntu.png" width={120} height={120} alt="" />
          </div>
          <Form
            className="w-full"
            form={form}
            onFinish={onFinish}
            fields={[
              {
                name: ["firstname"],
                value: "quangminh5@ntu.edu.vn",
              },
              {
                name: ["lastname"],
                value: payload?.lastname,
              },
              {
                name: ["mail"],
                value: payload?.mail,
              },
              {
                name: ["password"],
                value: payload?.password,
              },
            ]}
          >
            {step === ERegisterStep.EMAIL_INPUT && (
              <>
                <div className="py-[24px]">
                  <div
                    className={`w-full text-center text-[20px] text-black ${fontMedium.className}`}
                  >
                    Nhập email của bạn
                  </div>
                  <div className="text-center text-black italic">
                    Lưu ý: Sử dụng email trường Đại học Nha Trang
                  </div>
                </div>
                <div className="w-full text-black">
                  <Form.Item
                    name="mail"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập email",
                      },
                    ]}
                  >
                    <Input placeholder="Tài khoản/ email" />
                  </Form.Item>
                </div>
                <div className="flex flex-col justify-center w-full h-[85px]">
                  <Button
                    className="bg-[#226597] w-full py-[14px] px-[59px] rounded-[10px] text-white"
                    onClick={onButtonSubmit}
                    loading={isLoading}
                  >
                    Tiếp theo
                  </Button>
                </div>
                <div className="w-full py-[7px] text-[10px] text-center">
                  <Link className="text-[#4188B0]" href="/login">
                    Trở về trang đăng nhập
                  </Link>
                </div>
              </>
            )}

            {step === ERegisterStep.OTP_INPUT && (
              <>
                <div className="py-[24px]">
                  <div
                    className={`w-full text-center text-[20px] text-black ${fontMedium.className}`}
                  >
                    Nhập mã OTP của bạn
                  </div>
                  <div className="text-center text-black italic">
                    Gồm 4 chữ số
                  </div>
                </div>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  containerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    color: "black",
                    justifyContent: "center",
                  }}
                  inputStyle={{
                    border: " 1px solid rgba(102, 91, 91, 0.76)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    color: "black",
                  }}
                  renderInput={(props: any) => <input {...props} />}
                />
                <div className="flex flex-col justify-center w-full h-[85px]">
                  <Button
                    className="bg-[#226597] w-full py-[14px] px-[59px] rounded-[10px] text-white"
                    onClick={() =>
                      onNextStepClick(ERegisterStep.PASSWORD_INPUT)
                    }
                  >
                    Xác nhận
                  </Button>
                </div>
                <div className="w-full py-[7px] text-[10px] text-center">
                  <Link
                    className="text-[#4188B0]"
                    href="#"
                    onClick={() => setStep(ERegisterStep.EMAIL_INPUT)}
                  >
                    Trở về
                  </Link>
                </div>
              </>
            )}

            {step === ERegisterStep.PASSWORD_INPUT && (
              <>
                <div className="py-[24px]">
                  <div
                    className={`w-full text-center text-[20px] text-black ${fontMedium.className}`}
                  >
                    Tạo mật khẩu
                  </div>
                  <div className="text-center text-black italic">Lưu ý:</div>
                </div>
                <div className="w-full text-black">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập password",
                      },
                    ]}
                  >
                    <Input placeholder="Mật khẩu" type="password" />
                  </Form.Item>
                </div>
                <div className="flex flex-col justify-center w-full h-[85px]">
                  <Button
                    className="bg-[#226597] w-full py-[14px] px-[59px] rounded-[10px] text-white"
                    onClick={onButtonSubmit}
                  >
                    Tiếp theo
                  </Button>
                </div>
                <div className="w-full py-[7px] text-[10px] text-center">
                  <Link
                    className="text-[#4188B0]"
                    href="#"
                    onClick={() => setStep(ERegisterStep.OTP_INPUT)}
                  >
                    Trở về
                  </Link>
                </div>
              </>
            )}

            {step === ERegisterStep.USER_INFO && (
              <>
                <div className="py-[24px]">
                  <div
                    className={`w-full text-center text-[20px] text-black ${fontMedium.className}`}
                  >
                    Thông tin cá nhân
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] w-full text-black">
                  <Form.Item
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập tên",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Tên"
                      icon={<UserIcon width={17} height={17} />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập họ",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Họ"
                      icon={<UserIcon width={17} height={17} />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="BOD"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập ngày sinh",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Ngày sinh"
                      icon={<CalendarIcon width={17} height={17} />}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col justify-center w-full h-[85px]">
                  <Button
                    className="bg-[#226597] w-full py-[14px] px-[59px] rounded-[10px] text-white"
                    onClick={onButtonSubmit}
                  >
                    Tiếp theo
                  </Button>
                </div>
                <div className="w-full py-[7px] text-[10px] text-center">
                  <Link
                    className="text-[#4188B0]"
                    href="#"
                    onClick={() => setStep(ERegisterStep.PASSWORD_INPUT)}
                  >
                    Trở về
                  </Link>
                </div>
              </>
            )}

            {step === ERegisterStep.ROLE && (
              <>
                <div className="py-[24px]">
                  <div
                    className={`w-full text-center text-[20px] text-black ${fontMedium.className}`}
                  >
                    Bạn là ...
                  </div>
                </div>
                <Radio.Group
                  onChange={onChangeRole}
                  value={gender}
                  className="flex flex-row gap-[20px]"
                >
                  <div className="flex flex-col justify-center items-center w-full">
                    <Image
                      src="/images/Male.png"
                      width={110}
                      height={124}
                      alt=""
                    />
                    <div
                      className={`text-[18px] w-full text-center font-bold ${cabinFont.className}`}
                    >
                      Nam
                    </div>
                    <Radio className="contents" value={"male"}></Radio>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <Image
                      src="/images/Female.png"
                      width={110}
                      height={124}
                      alt=""
                    />
                    <div
                      className={`text-[18px] w-full text-center font-bold ${cabinFont.className}`}
                    >
                      Nữ
                    </div>
                    <Radio className="contents" value={"female"}></Radio>
                  </div>
                </Radio.Group>
                <div className="flex flex-col justify-center w-full h-[85px]">
                  <Button
                    className="bg-[#226597] w-full py-[14px] px-[59px] rounded-[10px] text-white"
                    onClick={onButtonSubmit}
                    loading={isLoading}
                  >
                    Tiếp theo
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </UnRequireAuth>
  );
}
