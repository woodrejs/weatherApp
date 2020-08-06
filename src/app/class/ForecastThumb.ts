import { setIcon } from "../utils/setIcon";

///FORECAST THUMBNAIL
export class ForecastThumb {
  hostElem: HTMLDivElement;
  targetElem: HTMLDivElement;
  imgElem: HTMLImageElement;
  tempElem: HTMLSpanElement;
  dateElem: HTMLSpanElement;
  houreElem: HTMLSpanElement;
  date: string;
  time: string[];
  temp: string;
  weather: string;
  hour: string;

  constructor(time: string, temp: string, weather: string) {
    const FCSTtpl = document.getElementById("FCSThmbTpl")!;
    const tpl = document.importNode(FCSTtpl, true) as HTMLTemplateElement;

    this.time = time.split(" ");
    this.date = this.time[0];
    this.hour = this.time[1];
    this.temp = `${temp} &#8451`;
    this.weather = weather;

    this.hostElem = document.getElementById("FCSThmbctr") as HTMLDivElement;
    this.targetElem = tpl.content.childNodes[1] as HTMLDivElement;
    this.dateElem = this.targetElem.childNodes[1] as HTMLSpanElement;
    this.imgElem = this.targetElem.childNodes[3] as HTMLImageElement;
    this.tempElem = this.targetElem.childNodes[5] as HTMLSpanElement;
    this.houreElem = this.targetElem.childNodes[7] as HTMLSpanElement;

    //init
    this.create();
  }

  create() {
    setIcon(this.weather, this.imgElem);
    this.dateElem.innerHTML = this.date;
    this.houreElem.innerHTML = this.hour;
    this.tempElem.innerHTML = this.temp;

    this.hostElem.insertAdjacentElement("afterbegin", this.targetElem);
  }
}
