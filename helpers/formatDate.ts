const monthNamesShortEN = [
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

const monthNamesFullEN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNamesShortEN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dayNamesFullEN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDate = (
  dateString?: string | Date,
  format: string = "YYYY-MM-DD"
) => {
  const date = dateString ? new Date(dateString) : new Date();

  const padZero = (value: number) => `0${value}`.slice(-2);

  const dayIndex = date.getDay();
  const year = date.getFullYear();
  const monthIndex = date.getMonth();

  const formattedDate = format
    .replace("YYYY", year.toString())
    .replace("a", date.getHours() < 12 ? "AM" : "PM")
    .replace("MMMM", monthNamesFullEN[monthIndex]!)
    .replace("MMM", monthNamesShortEN[monthIndex]!)
    .replace("MM", padZero(monthIndex + 1))
    .replace("dddd", dayNamesFullEN[dayIndex]!)
    .replace("ddd", dayNamesShortEN[dayIndex]!)
    .replace("DD", padZero(date.getDate()))
    .replace("hh", padZero(date.getHours()))
    .replace("HH", padZero(date.getHours() % 12 || 12))
    .replace("mm", padZero(date.getMinutes()))
    .replace("ss", padZero(date.getSeconds()));
  return formattedDate;
};

export { formatDate };
