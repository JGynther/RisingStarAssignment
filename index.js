import express from "express";
import getDowntrend from "./api/downtrend.js";
import getMaxVolume from "./api/maxvolume.js";
import timeMachine from "./api/timemachine.js";
import { convertParamToDateString } from "./lib/dateutils.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) =>
  res.send(
    `<h1>Hello <h style='text-decoration:line-through'>World</h> Vincit!</h1>
    <p><a href='https://github.com/JGynther/RisingStarAssignment/blob/main/README.md' target='_blank' rel='noreferrer'>View documentation for usage</a></p>`
  )
);

app.get("/downtrend/:startDate-:endDate", async (req, res, next) => {
  let { startDate, endDate } = req.params;
  try {
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
  } catch (e) {
    next(e.message);
  }
});

app.get("/maxvolume/:startDate-:endDate", async (req, res, next) => {
  let { startDate, endDate } = req.params;
  try {
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
      date: date,
    });
  } catch (e) {
    next(e.message);
  }
});

app.get("/timemachine/:startDate-:endDate", async (req, res, next) => {
  let { startDate, endDate } = req.params;
  try {
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
  } catch (e) {
    next(e.message);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
