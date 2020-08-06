import "./app/scss/index.scss";
import { fetchCurrentForecast } from "./app/utils/fetchCurrentForecast";
import { fetchFutureForecast } from "./app/utils/fetchFutureForecast";
import { moveSlider } from "./app/utils/moveSlider";
import { resizer } from "./app/utils/resizer";
import { search } from "./app/utils/search";

import { rightArrow, leftArrow, searchButton } from "./app/global/HTML";

window.onload = () => {
  fetchCurrentForecast("coords");
  fetchFutureForecast("coords");
  resizer();

  rightArrow.addEventListener("click", moveSlider);
  leftArrow.addEventListener("click", moveSlider);
  window.addEventListener("resize", resizer);
  searchButton.addEventListener("click", search);
};
