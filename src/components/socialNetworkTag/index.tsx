type TSocialNetworkTagProps = {
  type?: "first" | "second" | "third";

  className?: string;

  value?: string;
};

const getClassName = (
  type: "first" | "second" | "third",
  extraClassName?: string
) => {
  const baseClass =
    "flex flex-row justify-center items-center rounded-[10px] px-[2px] py-[8px] text-[20px] font-bold text-center text-black";

  const extra = (() => {
    switch (type) {
      case "first":
        return "bg-[#FFEAA0] text-white";
      case "second":
        return "bg-[#CCFFBA] text-white";
      case "third":
        return "bg-[#E4F2FB] text-white";
      default:
        return "bg-[#E4F2FB] text-white";
    }
  })();

  return `${baseClass} ${extra} ${extraClassName ?? ""}`;
};

export const SocialNetworkTag = ({
  className,
  type = "first",
  value = "1",
}: TSocialNetworkTagProps) => {
  const tagClassName = getClassName(type, className);

  return (
    <div className={tagClassName}>
      <div className="w-[24px] h-[24px] text-black">{value}</div>
    </div>
  );
};
