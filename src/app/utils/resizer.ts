import { FCSThmbctr, SLDR } from "../global/HTML";
import VAR from "../global/vars";

///RESIZE
export const resizer = () => {
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const rowSLDS = SCREEN_WIDTH < 600 && SCREEN_HEIGHT > 320 ? 2 : 3;
  const sliderWidth = SLDR.offsetWidth;
  const slideWidth = sliderWidth / rowSLDS;

  FCSThmbctr.style.width = `${sliderWidth * (40 / rowSLDS)}px`;

  FCSThmbctr.style.transform = `translateX(-${slideWidth * VAR.counter}px)`;
};
