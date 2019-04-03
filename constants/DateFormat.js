const months = [
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
  "Dec"
];

// format: "01 Apr 2019"
const stringDate = dateTime => {
  return (
    (dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()) +
    " " +
    months[dateTime.getMonth()] +
    " " +
    dateTime.getFullYear()
  );
};

// format: "2019-04-01"
const scheduleDate = dateTime => {
  return `${dateTime.getFullYear()}-${
    dateTime.getMonth() < 10
      ? "0" + (dateTime.getMonth() + 1)
      : dateTime.getMonth() + 1
  }-${dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()}`;
};

// format: "16:23"
const time = dateTime => {
  return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
};

export default {
  stringDate,
  scheduleDate,
  time
};
