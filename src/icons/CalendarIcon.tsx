export const CalendarIcon = ({
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
        d="M7.58337 1.75L7.58337 3.41667"
        stroke="#222222"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3.41663 1.75L3.41663 3.41667"
        stroke="#222222"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M1.75 5.08333C1.75 5.00596 1.75 4.96727 1.75107 4.93456C1.78555 3.88134 2.63134 3.03555 3.68456 3.00107C3.71727 3 3.75596 3 3.83333 3H7.16667C7.24404 3 7.28273 3 7.31544 3.00107C8.36866 3.03555 9.21445 3.88134 9.24893 4.93456C9.25 4.96727 9.25 5.00596 9.25 5.08333V5.08333H1.75V5.08333Z"
        stroke="#222222"
        strokeWidth="1.2"
      />
      <rect
        x="1.75"
        y="3"
        width="7.5"
        height="6.25"
        rx="2"
        stroke="#222222"
        strokeWidth="1.2"
      />
      <path
        d="M3 6.75H4.66667"
        stroke="#7E869E"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6.33337 6.75H8.00004"
        stroke="#7E869E"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3 8H4.66667"
        stroke="#7E869E"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6.33337 8H8.00004"
        stroke="#7E869E"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
