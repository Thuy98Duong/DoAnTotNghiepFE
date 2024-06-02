import { usePathname } from "next/navigation";

export const Main = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const isMessageScreen = (href?: string) => {
    return path?.includes("message");
  };
  return (
    <div
      className={`bg-[#E8F3F8] w-full  py-[20px] px-[60px] ${
        isMessageScreen() ? "min-h-[92vh]" : "min-h-screen"
      }`}
    >
      {children}
    </div>
  );
};
