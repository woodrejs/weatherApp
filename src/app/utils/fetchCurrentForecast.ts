import { getDate } from "./getDate";
import { getCoords } from "./getCoords";
import { Forecast } from "../class/Forecast";

type FetchFn = (
  searchBy: "name" | "coords",
  city?: string | undefined
) => Promise<void>;

/// TODAY FORECAST
export const fetchCurrentForecast: FetchFn = async (searchBy, city) => {
  const coords = await getCoords();
  const KEY = process.env.KEY;
  const URL = () => {
    if (searchBy === "name") {
      return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`;
    } else {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${KEY}`;
    }
  };

  type Resp = {
    main: { temp: number; feels_like: number; pressure: string };
    weather: { description: string }[];
    wind: { speed: string };
    name: string;
  };

  fetch(URL())
    .then((resp) => resp.json())
    .then((resp: Resp) => {
      const { main, weather, wind, name } = resp;

      const temp = Math.round(main.temp).toString();
      const feelLike = Math.round(main.feels_like).toString();
      const description = weather[0].description;
      const pressure = main.pressure;
      const speed = wind.speed;
      const date = getDate();

      new Forecast(temp, feelLike, description, pressure, speed, date, name);
    })
    .catch((err) => console.log(err));
};
