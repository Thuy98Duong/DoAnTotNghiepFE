export const UserCircleIcon = ({
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
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12.5"
        cy="10"
        r="3"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12.5" cy="12" r="9" stroke="#33363F" strokeWidth="2" />
      <path
        d="M18.2805 18.8264C18.4076 18.7566 18.4678 18.6055 18.414 18.4708C18.0284 17.5045 17.2856 16.6534 16.2814 16.0332C15.1966 15.3632 13.8674 15 12.5 15C11.1326 15 9.80341 15.3632 8.71858 16.0332C7.71444 16.6534 6.9716 17.5045 6.58598 18.4708C6.53223 18.6055 6.59236 18.7566 6.71948 18.8264C10.3197 20.803 14.6803 20.803 18.2805 18.8264Z"
        fill="#33363F"
      />
    </svg>
  );
};
