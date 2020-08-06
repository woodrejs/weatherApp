import { FCSThmbctr, FCSTctr, searchZone } from "../global/HTML";
import VAR from "../global/vars";

///CLEAR APP
export const clearApp = () => {
  FCSThmbctr.innerHTML = "";
  FCSTctr.innerHTML = "";
  VAR.FCSThmbArr.length = 0;
  searchZone.value = "";
};
