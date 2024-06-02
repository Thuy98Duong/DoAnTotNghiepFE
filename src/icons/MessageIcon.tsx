export const MessageIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 35}
      height={height ?? 35}
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.1666 16.0417C29.1666 11.9454 29.1666 9.89719 28.1835 8.42588C27.7579 7.78894 27.211 7.24206 26.5741 6.81647C25.1028 5.83337 23.0546 5.83337 18.9583 5.83337H16.0416C11.9452 5.83337 9.89706 5.83337 8.42576 6.81647C7.78882 7.24206 7.24194 7.78894 6.81635 8.42588C5.83325 9.89719 5.83325 11.9454 5.83325 16.0417C5.83325 20.1381 5.83325 22.1862 6.81635 23.6575C7.24194 24.2945 7.78882 24.8414 8.42576 25.2669C9.71106 26.1258 11.4366 26.2343 14.5833 26.2481V26.25L16.1955 29.4746C16.733 30.5495 18.2669 30.5495 18.8043 29.4746L20.4166 26.25V26.2481C23.5632 26.2343 25.2888 26.1258 26.5741 25.2669C27.211 24.8414 27.7579 24.2945 28.1835 23.6575C29.1666 22.1862 29.1666 20.1381 29.1666 16.0417ZM13.1249 12.125C12.5726 12.125 12.1249 12.5728 12.1249 13.125C12.1249 13.6773 12.5726 14.125 13.1249 14.125H21.8749C22.4272 14.125 22.8749 13.6773 22.8749 13.125C22.8749 12.5728 22.4272 12.125 21.8749 12.125H13.1249ZM13.1249 17.9584C12.5726 17.9584 12.1249 18.4061 12.1249 18.9584C12.1249 19.5107 12.5726 19.9584 13.1249 19.9584H17.4999C18.0522 19.9584 18.4999 19.5107 18.4999 18.9584C18.4999 18.4061 18.0522 17.9584 17.4999 17.9584H13.1249Z"
        fill="black"
      />
    </svg>
  );
};
