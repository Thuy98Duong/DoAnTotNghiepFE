export const ClockIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 25 22"
      fill="none"
    >
      <circle cx="12.5" cy="12" r="9" stroke="#33363F" strokeWidth="2" />
      <path
        d="M17 12H12.75C12.6119 12 12.5 11.8881 12.5 11.75V8.5"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
