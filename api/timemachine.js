import fetchData from "../lib/fetchdata.js";
import {
  getArrayMinMax,
  longestBearishTrend,
  lowestValueBeforeMax,
  highestValueAfterMin,
} from "../lib/mathutils.js";
import { convertTimestampToDate } from "../lib/dateutils.js";

export default async function timeMachine({ startDate, endDate }) {
  const data = await fetchData({
    startDate: startDate,
    endDate: endDate,
  });

  // Make a one dimensional price array
  const prices = data.prices.map(([timestamp, price]) => price);

  // Find the min and max values
  const [min, max, minIndex, maxIndex] = getArrayMinMax(prices);

  // Get the maximum downtrend length
  const downtrend = longestBearishTrend(prices);

  // If the price only goes down, return NaN to indicate no buying or selling.
  if (downtrend === prices.length) {
    return [NaN, NaN];
  }

  // If the lowest value comes before the highest value, we can simply use them as the buy and sell dates.
  if (minIndex < maxIndex) {
    return [
      convertTimestampToDate(data.prices[minIndex][0]),
      convertTimestampToDate(data.prices[maxIndex][0]),
    ];
  }

  // We can determine the best buy and sell dates by finding the lowest value before the max and the highest value after the min,
  // then comparing the two values.
  //
  const [minBeforeMax, minBeforeMaxIndex] = lowestValueBeforeMax(
    prices,
    maxIndex
  );

  const [maxAfterMin, maxAfterMinIndex] = highestValueAfterMin(
    prices,
    minIndex
  );

  // Comparison for a ternary operator
  const comparison = max - minBeforeMax > maxAfterMin - min;

  return [
    convertTimestampToDate(
      data.prices[comparison ? minBeforeMaxIndex : minIndex][0]
    ),
    convertTimestampToDate(
      data.prices[comparison ? maxIndex : maxAfterMinIndex][0]
    ),
  ];
}
