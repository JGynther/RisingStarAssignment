// Convert a date string (eg. "2020-01-01") to a UNIX timestamp (eg. 1577836800)
export function convertDateToTimestamp(date) {
  date = new Date(date);
  date.setHours(date.getHours() + 1); // Add 1 hour to ensure we get some data
  return Math.floor(date.getTime() / 1000);
}

// Convert a UNIX timestamp (eg. 1577836800) to a date string (eg. "2020-01-01")
export function convertTimestampToDate(timestamp) {
  return new Date(timestamp).toISOString().split("T")[0];
}

// Takes a param string (eg. 20200101) and converts it to a date string (eg. 2020-01-01)
// Technically won't work past the year 9999... :/
export function convertParamToDateString(param) {
  return param.slice(0, 4) + "-" + param.slice(4, 6) + "-" + param.slice(6, 8);
}
