import { getCoords } from "./getCoords";
import { ForecastThumb } from "../class/ForecastThumb";

type FetchFn = (
  searchBy: "name" | "coords",
  city?: string | undefined
) => Promise<void>;

/// 4 DAYS FORECAST
export const fetchFutureForecast: FetchFn = async (searchBy, city) => {
  const coords = await getCoords();
  const KEY = process.env.KEY;

  const URL = () => {
    if (searchBy === "name") {
      return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${KEY}`;
    } else {
      return `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${KEY}`;
    }
  };

  type RespList = {
    list: {
      dt_txt: string;
      main: { temp: number };
      weather: { description: string }[];
    }[];
  };
  fetch(URL())
    .then((resp) => resp.json())
    .then((resp: RespList) => {
      console.log(resp);

      for (const forecast of resp.list) {
        const time = forecast.dt_txt;
        const temp = Math.round(forecast.main.temp).toString();
        const weather = forecast.weather[0].description;

        new ForecastThumb(time, temp, weather);
      }
    })
    .catch((err) => console.log(err));
};
