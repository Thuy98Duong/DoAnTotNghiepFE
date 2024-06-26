export const DateRangeIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 28}
      height={height ?? 28}
      viewBox="0 0 28 28"
      fill="none"
    >
      <rect
        x="3.5"
        y="7"
        width="21"
        height="17.5"
        rx="2"
        stroke="#33363F"
        strokeWidth="2"
      />
      <path
        d="M3.5 11C3.5 9.11438 3.5 8.17157 4.08579 7.58579C4.67157 7 5.61438 7 7.5 7H20.5C22.3856 7 23.3284 7 23.9142 7.58579C24.5 8.17157 24.5 9.11438 24.5 11V11.6667H3.5V11Z"
        fill="#33363F"
      />
      <path
        d="M8.1665 3.5L8.1665 7"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19.8335 3.5L19.8335 7"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="8.1665"
        y="14"
        width="4.66667"
        height="2.33333"
        rx="0.5"
        fill="#33363F"
      />
      <rect
        x="8.1665"
        y="18.6666"
        width="4.66667"
        height="2.33333"
        rx="0.5"
        fill="#33363F"
      />
      <rect
        x="15.1665"
        y="14"
        width="4.66667"
        height="2.33333"
        rx="0.5"
        fill="#33363F"
      />
      <rect
        x="15.1665"
        y="18.6666"
        width="4.66667"
        height="2.33333"
        rx="0.5"
        fill="#33363F"
      />
    </svg>
  );
};
