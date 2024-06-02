import localFont from "next/font/local";

const fontMedium = localFont({
  src: [
    {
      path: "../fonts/Calistoga-Regular.ttf",
      weight: "400",
    },
  ],
});

const cabinFont = localFont({
  src: [
    {
      path: "../fonts/Cabin-Regular.ttf",
      weight: "400",
    },
    {
      path: "../fonts/Cabin-Medium.ttf",
      weight: "500",
    },
    {
      path: "../fonts/Cabin-Bold.ttf",
      weight: "700",
    },
  ],
});

export { fontMedium, cabinFont };
