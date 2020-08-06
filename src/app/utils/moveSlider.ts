import VAR from "../global/vars";
import { FCSThmbctr, SLDR } from "../global/HTML";

///SLIDER MOVE
export const moveSlider = (e: Event) => {
  const ID = (e.currentTarget as HTMLButtonElement).id;
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const rowSLDS = SCREEN_WIDTH < 600 && SCREEN_HEIGHT > 320 ? 2 : 3;
  const slideWidth = SLDR.offsetWidth / rowSLDS;

  if (ID == "right" && VAR.counter == 37) VAR.counter = 37;
  else if (ID == "left" && VAR.counter == 0) VAR.counter = 0;
  else if (ID == "right") VAR.counter++;
  else VAR.counter--;

  FCSThmbctr.style.transform = `translateX(-${slideWidth * VAR.counter}px)`;
};
