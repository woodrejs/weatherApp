import { clearApp } from "./clearApp";
import { fetchFutureForecast } from "./fetchFutureForecast";
import { fetchCurrentForecast } from "./fetchCurrentForecast";
import { searchZone, SLDR } from "../global/HTML";

///SEARCH
export const search = (e: Event) => {
  const cityName = searchZone.value;
  SLDR.style.backgroundColor = "rgba(38, 29, 38, 0)"; /// zamienic na add classlist
  clearApp();

  fetchFutureForecast("name", cityName);
  fetchCurrentForecast("name", cityName);
};
