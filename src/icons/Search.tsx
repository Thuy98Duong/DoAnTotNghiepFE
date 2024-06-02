export const SearchIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "10"}
      height={height || "10"}
      viewBox="0 0 10 10"
      fill="none"
    >
      <circle cx="4.58331" cy="4.58325" r="2.5" stroke="#222222" />
      <path
        d="M8.33331 8.33325L7.08331 7.08325"
        stroke="#222222"
        strokeLinecap="round"
      />
    </svg>
  );
};
