export const LikeIcon = ({
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
      width={width || "10"}
      height={height || "10"}
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M1.85428 5.79505L4.75121 8.5164C4.89096 8.64768 5.10871 8.64768 5.24847 8.5164L8.14539 5.79505C8.96046 5.02937 9.05944 3.76938 8.37392 2.88582L8.24503 2.71969C7.42495 1.6627 5.77885 1.83997 5.20261 3.04731C5.12122 3.21786 4.87846 3.21786 4.79706 3.04731C4.22082 1.83997 2.57472 1.6627 1.75465 2.71969L1.62575 2.88582C0.940232 3.76938 1.03921 5.02937 1.85428 5.79505Z"
        stroke={fill || "#33363F"}
        strokeWidth="2"
      />
    </svg>
  );
};