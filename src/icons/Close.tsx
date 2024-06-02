export const CloseIcon = ({
  width,
  height,
  fill,
}: {
  width?: number;
  height?: number;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "40"}
      height={height || "35"}
      viewBox="0 0 40 35"
      fill={fill || "none"}
    >
      <path
        d="M30 8.75L10 26.25"
        stroke="#E8F3F8"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.75L30 26.25"
        stroke="#E8F3F8"
        strokeWidth="2"
        stroke-linecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
