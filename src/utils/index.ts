import moment from "moment";

export const isNetworkError = (error: any) => {
  return error.code === "ERR_NETWORK";
};

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function bindClassNames(data: Record<string, boolean>) {
  let className = "";
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      className += ` ${key}`;
    }
  }

  return className;
}

export function timeAgo(time: number | Date) {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s trước",
      s: "vài giây trước",
      ss: "%d giây",
      m: "1 phút",
      mm: "%d phút",
      h: "1 giờ",
      hh: "%d giờ",
      d: "1 ngày",
      dd: "%d ngày",
      w: "1 tuần",
      ww: "%d tuần",
      M: "1 tháng",
      MM: "%d tháng",
      y: "1 năm",
      yy: "%d năm",
    },
  });
  return moment(time).fromNow(true);
}

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getMessageTime = (time: number) => {
  if (!time || time <= 0) {
    return "";
  }

  const date = new Date(time);

  if (date.getDate() !== new Date().getDate()) {
    if (moment().isSame(date, "week")) {
      return `${dayNames[date.getDay()]}`;
    }
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  }

  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};

const addZero = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === "" ||
    value === null ||
    value?.toString() === "{}" ||
    value?.toString() === "" ||
    value?.toString()?.toLowerCase() === "null" ||
    value === "undefined"
  );
};
