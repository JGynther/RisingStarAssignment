import fetch from "node-fetch";
import { parseParamString, convertDateToTimestamp } from "./dateutils.js";

const baseURL =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur";

export default async function fetchData({ startDate, endDate }) {
  // Check validity of params
  parseParamString(startDate, "startDate");
  parseParamString(endDate, "endDate");

  // Convert the dates to UNIX timestamps
  const startTimestamp = convertDateToTimestamp(startDate);
  const endTimestamp = convertDateToTimestamp(endDate);

  const URL = baseURL + `&from=${startTimestamp}&to=${endTimestamp}`;

  const response = await fetch(URL);
  const data = await response.json();

  // Filter the data to only include the data points we want
  const filteredPrices = await filterDataForProperTimestamps(data.prices);
  const filteredMarketCaps = await filterDataForProperTimestamps(
    data.market_caps
  );
  const filteredVolumes = await filterDataForProperTimestamps(
    data.total_volumes
  );

  return {
    prices: filteredPrices,
    market_caps: filteredMarketCaps,
    total_volumes: filteredVolumes,
  };
}

// The Coingecko API automatically changes granularity of the data based on the time range.
// This results in the data having more data points than we want.
// As we are only interested in a single price per day, we need to filter the data.
//
// The data is in arrays like [timestamp, x]
//
async function filterDataForProperTimestamps(array) {
  // The first element is always correct
  let filteredArray = [array[0]];

  for (let i = 1; i < array.length; i++) {
    // We can compare the dates of n and n-1 elements and if the date changes,
    // we know that n is a data point we actually want in the array.
    if (
      new Date(array[i][0]).getDate() !== new Date(array[i - 1][0]).getDate()
    ) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
}
