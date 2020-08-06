import ICONS from "../global/icons";

///SET ICON
export const setIcon = (weather: string, img: HTMLImageElement) => {
  switch (weather) {
    case "clear sky":
      img.setAttribute("src", ICONS.clearSky);
      break;
    case "few clouds":
      img.setAttribute("src", ICONS.fewClouds);
      break;
    case "scattered clouds":
    case "overcast clouds":
      img.setAttribute("src", ICONS.scatteredClouds);
      break;
    case "broken clouds":
      img.setAttribute("src", ICONS.brokenClouds);
      break;
    case "shower rain":
    case "light rain":
      img.setAttribute("src", ICONS.showerRain);
      break;
    case "rain":
      img.setAttribute("src", ICONS.rain);
      break;
    case "thunderstorm":
      img.setAttribute("src", ICONS.thunderstorm);
      break;
    case "snow":
    case "light snow":
      img.setAttribute("src", ICONS.snow);
      break;
    default:
      img.setAttribute("src", ICONS.mist);
      break;
  }
};
