import { setIcon } from "../utils/setIcon";

///FORECAST
export class Forecast {
  hostElem: HTMLDivElement;
  targetElem: HTMLDivElement;
  imgElem: HTMLImageElement;
  nameElem: HTMLSpanElement;
  tempElem: HTMLSpanElement;
  feelLikeElem: HTMLSpanElement;
  dataElem: HTMLSpanElement;
  windElem: HTMLSpanElement;
  pressureElem: HTMLSpanElement;
  temp: string;
  feelLike: string;
  weather: string;
  pressure: string;
  wind: string;
  date: string;
  name: string;

  constructor(
    temp: string,
    feelLike: string,
    weather: string,
    pressure: string,
    wind: string,
    date: string,
    name: string
  ) {
    const FCSTtpl = document.getElementById("FCSTpl")!;
    const tpl = document.importNode(FCSTtpl, true) as HTMLTemplateElement;

    this.temp = temp;
    this.feelLike = feelLike;
    this.weather = weather;
    this.pressure = pressure;
    this.wind = wind;
    this.date = date;
    this.name = name;

    this.hostElem = document.getElementById("FCSTctr") as HTMLDivElement;
    this.targetElem = tpl.content.childNodes[1] as HTMLDivElement;
    this.imgElem = this.targetElem.childNodes[1] as HTMLImageElement;
    this.nameElem = this.targetElem.childNodes[3] as HTMLSpanElement;
    this.tempElem = this.targetElem.childNodes[5] as HTMLSpanElement;
    this.feelLikeElem = this.targetElem.childNodes[7] as HTMLSpanElement;
    this.dataElem = this.targetElem.childNodes[9] as HTMLSpanElement;
    this.windElem = this.targetElem.childNodes[11] as HTMLSpanElement;
    this.pressureElem = this.targetElem.childNodes[13] as HTMLSpanElement;

    //init
    this.create();
  }

  create() {
    setIcon(this.weather, this.imgElem);
    this.hostElem.insertAdjacentElement("afterbegin", this.targetElem);
    this.nameElem.innerHTML = this.name;
    this.tempElem.innerHTML = this.temp;
    this.feelLikeElem.innerHTML = this.feelLike;
    this.dataElem.innerHTML = this.date;
    this.windElem.innerHTML = this.wind;
    this.pressureElem.innerHTML = this.pressure;
  }
}
