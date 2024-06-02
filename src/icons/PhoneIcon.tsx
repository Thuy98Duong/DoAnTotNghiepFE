export const PhoneIcon = ({
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
      <g clipPath="url(#clip0_5_141)">
        <path
          d="M4.66663 1.25H4.16663V1.75C4.16663 2.25626 4.57703 2.66667 5.08329 2.66667H5.91663C6.42289 2.66667 6.83329 2.25626 6.83329 1.75V1.25H6.33329H4.66663Z"
          stroke="#222222"
        />
        <rect
          x="3.5"
          y="1.83333"
          width="4"
          height="7.33333"
          rx="1.5"
          stroke="#222222"
        />
        <circle cx="5.50004" cy="8" r="0.416667" fill="#222222" />
      </g>
      <defs>
        <clipPath id="clip0_5_141">
          <rect
            width="10"
            height="10"
            fill="white"
            transform="matrix(1 0 0 -1 0.5 10.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
