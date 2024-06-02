export const CircleRight = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 25}
      height={height ?? 25}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M10.5 11.5L14.5 15.5L10.5 19.5"
        stroke="#33363F"
        strokeWidth="2"
      />
      <path
        d="M10.1706 6.65333C8.06156 6.9359 6.22985 7.59219 5.01677 8.49993C3.8037 9.40768 3.292 10.505 3.577 11.5874C3.862 12.6698 4.92426 13.6634 6.56589 14.3833C8.20751 15.1031 10.3165 15.5 12.5 15.5"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20.2942 13.25C20.8852 12.7382 21.2687 12.1733 21.423 11.5874C21.5773 11.0015 21.4992 10.4061 21.1933 9.83531C20.8874 9.2645 20.3597 8.7294 19.6402 8.26057C18.9207 7.79174 18.0236 7.39836 17 7.10289"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
