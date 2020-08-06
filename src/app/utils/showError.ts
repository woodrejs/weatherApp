import { FCSTctr, SLDR } from "../global/HTML";

////ERROR MESSAGE
export const showError = () => {
  const errTpl = document.getElementById("error")!;
  const tpl = document.importNode(errTpl, true) as HTMLTemplateElement;
  const err = tpl.content.childNodes[1] as HTMLDivElement;

  FCSTctr.appendChild(err);
  SLDR.style.backgroundColor = "rgba(38, 29, 38, 0.8)"; /// zamienic na add classlist
};
