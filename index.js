import express from "express";
import getDowntrend from "./api/downtrend.js";
import getMaxVolume from "./api/maxvolume.js";
import timeMachine from "./api/timemachine.js";
import { convertParamToDateString } from "./lib/dateutils.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("Hello Vincit!"));

app.get("/downtrend/:startDate-:endDate", async (req, res) => {
  let { startDate, endDate } = req.params;

  startDate = convertParamToDateString(startDate);
  endDate = convertParamToDateString(endDate);

  const downtrend = await getDowntrend({
    startDate: startDate,
    endDate: endDate,
  });

  res.send({
    startDate: startDate,
    endDate: endDate,
    downtrend: downtrend,
  });
});

app.get("/maxvolume/:startDate-:endDate", async (req, res) => {
  let { startDate, endDate } = req.params;

  startDate = convertParamToDateString(startDate);
  endDate = convertParamToDateString(endDate);

  const [maxVolume, date, price] = await getMaxVolume({
    startDate: startDate,
    endDate: endDate,
  });

  res.send({
    startDate: startDate,
    endDate: endDate,
    maxVolume: maxVolume,
    volumeInEuros: (maxVolume * price).toFixed(2),
    date: date,
  });
});

app.get("/timemachine/:startDate-:endDate", async (req, res) => {
  let { startDate, endDate } = req.params;

  startDate = convertParamToDateString(startDate);
  endDate = convertParamToDateString(endDate);

  const [buyDate, sellDate] = await timeMachine({
    startDate: startDate,
    endDate: endDate,
  });

  res.send({
    startDate: startDate,
    endDate: endDate,
    buyDate: buyDate,
    sellDate: sellDate,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
