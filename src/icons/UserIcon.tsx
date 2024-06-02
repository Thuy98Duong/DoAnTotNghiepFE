export const UserIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 11}
      height={height ?? 11}
      viewBox="0 0 11 11"
      fill="none"
    >
      <path
        d="M8.71971 9.01962C8.5298 8.48804 8.11131 8.01831 7.52916 7.68329C6.94702 7.34827 6.23374 7.16667 5.49996 7.16667C4.76618 7.16667 4.0529 7.34827 3.47076 7.68329C2.88861 8.01831 2.47012 8.48804 2.28021 9.01962"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="5.50004"
        cy="3.83334"
        r="1.66667"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
