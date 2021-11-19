import fetchData from "../lib/fetchdata.js";
import { longestBearishTrend } from "../lib/mathutils.js";

export default async function getDowntrend({ startDate, endDate }) {
  const prices = await fetchData({
    startDate: startDate,
    endDate: endDate,
  })
    // Convert the full data to a one-dimensional price array
    .then((data) => data.prices)
    .then((prices) => prices.map(([timestamp, price]) => price));

  return longestBearishTrend(prices);
}
