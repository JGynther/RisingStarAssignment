import fetchData from "../lib/fetchdata.js";
import { getArrayMax } from "../lib/mathutils.js";
import { convertTimestampToDate } from "../lib/dateutils.js";

export default async function getMaxVolume({ startDate, endDate }) {
  const data = await fetchData({
    startDate: startDate,
    endDate: endDate,
  });

  // Create an array of all the volumes
  const volumes = data.total_volumes.map(([timestamp, volume]) => volume);

  const [maxVolume, index] = getArrayMax(volumes);
  const date = convertTimestampToDate(data.total_volumes[index][0]);
  const price = data.prices[index][1];

  return [maxVolume, date, price];
}
