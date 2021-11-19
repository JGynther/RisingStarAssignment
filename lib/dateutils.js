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

// Check if given param is a proper date string (eg. 2020-01-01)
export function parseParamString(param, paramName) {
  const pieces = param.split("-");
  if (
    pieces[0].length !== 4 ||
    pieces[1].length !== 2 ||
    pieces[2].length !== 2 ||
    pieces[0].match(/[^0-9]/) ||
    pieces[1].match(/[^0-9]/) ||
    pieces[2].match(/[^0-9]/)
  ) {
    throw new Error(`Invalid param string ${paramName}: ${param}`);
  }

  return true;
}
