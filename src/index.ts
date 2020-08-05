import "./app/scss/index.scss";

window.onload = function () {
  /*
  const futureForecastsContainer = document.querySelector(
    "#futureForecastsContainer"
  );
  const mainForecastContainer = document.querySelector(
    "#mainForecastContainer"
  );
  const leftArrow = document.querySelector("#left");
  const rightArrow = document.querySelector("#right");
  const searchButton = document.querySelector("#search");
  const searchZone = document.querySelector("#searchZone");
  const slider = document.querySelector("#slider");
  const futureForecasts = [];
  const date = getDate();

  ////ERROR MESSAGE
  const showError = () => {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error");
    errorMessage.innerHTML =
      "Wprowadziłeś niepoprawną nazwę miasta. Spróbuj ponownie.";
    mainForecastContainer.appendChild(errorMessage);
    slider.style.backgroundColor = "rgba(38, 29, 38, 0.8)";
  };
  ///SEARCH
  let cityName;
  const search = () => {
    cityName = searchZone.value;
    slider.style.backgroundColor = "rgba(38, 29, 38, 0)";
    clearApp();
    getTodayForecast(cityName);
    getFutureForecast(cityName);
  };
  searchButton.addEventListener("click", search);
  searchZone.addEventListener("keyup", (e) =>
    e.keyCode === 13 ? search() : false
  );
  ///CLEAR APP
  const clearApp = () => {
    futureForecastsContainer.innerHTML = "";
    mainForecastContainer.innerHTML = "";
    futureForecasts.length = 0;
  };
  ///DATE
  function getDate() {
    let date = new Date();
    let month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
    let result = `${date.getFullYear()}-${month}-${date.getDate()}`;
    return result;
  }
  ///SET ICON
  function setIcon(weather, img) {
    switch (weather) {
      case "clear sky":
        img.setAttribute("src", "assets/icons/clear_sky.png");
        break;
      case "few clouds":
        img.setAttribute("src", "assets/icons/few_clouds.png");
        break;
      case "scattered clouds":
      case "overcast clouds":
        img.setAttribute("src", "assets/icons/scattered_clouds.png");
        break;
      case "broken clouds":
        img.setAttribute("src", "assets/icons/broken_clouds.png");
        break;
      case "shower rain":
      case "light rain":
        img.setAttribute("src", "assets/icons/shower_rain.png");
        break;
      case "rain":
        img.setAttribute("src", "assets/icons/rain.png");
        break;
      case "thunderstorm":
        img.setAttribute("src", "assets/icons/thunderstorm.png");
        break;
      case "snow":
      case "light snow":
        img.setAttribute("src", "assets/icons/snow.png");
        break;
      default:
        img.setAttribute("src", "assets/icons/mist.png");
        break;
    }
  }
  ///FORECAST
  function Forecast(
    temp,
    feelLike,
    weather,
    pressure,
    wind,
    date,
    name = null,
    obj
  ) {
    this.temp = `${temp} &#8451`;
    this.name = name;
    this.date = date;
    this.feelLike = `${feelLike} &#8451`;
    this.weather = weather;
    this.pressure = `${pressure} hPa`;
    this.wind = `${wind} km/h`;
    this.obj = obj;

    this.thumbnail = document.createElement("img");
    this.nameSpan = document.createElement("span");
    this.tempSpan = document.createElement("span");
    this.feelLikeSpan = document.createElement("span");
    this.dataSpan = document.createElement("span");
    this.windSpan = document.createElement("span");
    this.pressureSpan = document.createElement("span");

    this.create = function () {
      setIcon(this.weather, this.thumbnail);
      this.nameSpan.innerHTML = this.name;
      this.tempSpan.innerHTML = this.temp;
      this.feelLikeSpan.innerHTML = this.feelLike;
      this.dataSpan.innerHTML = this.date;
      this.windSpan.innerHTML = this.wind;
      this.pressureSpan.innerHTML = this.pressure;

      obj.appendChild(this.thumbnail);
      obj.appendChild(this.nameSpan);
      obj.appendChild(this.tempSpan);
      obj.appendChild(this.feelLikeSpan);
      obj.appendChild(this.dataSpan);
      obj.appendChild(this.windSpan);
      obj.appendChild(this.pressureSpan);
    };
  }
  ///FORECAST THUMBNAIL
  function ForecastThumb(time, temp, weather, obj) {
    this.time = time.split(" ");
    this.date = this.time[0];
    this.hour = this.time[1];
    this.temp = `${temp} &#8451`;
    this.weather = weather;

    this.mainContainer = document.createElement("div");
    this.dataSpan = document.createElement("span");
    this.hourSpan = document.createElement("span");
    this.tempSpan = document.createElement("span");
    this.thumbnail = document.createElement("img");

    this.create = function () {
      this.dataSpan.innerHTML = this.date;
      this.hourSpan.innerHTML = this.hour;
      this.tempSpan.innerHTML = this.temp;
      setIcon(this.weather, this.thumbnail);

      obj.appendChild(this.mainContainer);
      this.mainContainer.appendChild(this.dataSpan);
      this.mainContainer.appendChild(this.thumbnail);
      this.mainContainer.appendChild(this.tempSpan);
      this.mainContainer.appendChild(this.hourSpan);
    };
  }
  ///GEOLOKALIZATION
  function getCityName() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=AIzaSyB9YJgnJbfaapYiytWhZRB7vLOWv8J8B9E`
        )
          .then((resp) => resp.json())
          .then((resp) => {
            const cityName = resp.plus_code.compound_code
              .split(" ")[1]
              .slice(0, -1);
            return cityName;
          })
          .then((cityName) => {
            getTodayForecast(cityName);
            getFutureForecast(cityName);
          })
          .catch((err) => console.log(err));
      },
      (err) => {
        getTodayForecast("Warszawa");
        getFutureForecast("Warszawa");
      }
    );
  }
  getCityName();
  /// TODAY FORECAST
  function getTodayForecast(cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8d04b2f8b25f0fa25cce7eb5e3c377e4`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        let temp = Math.round(resp.main.temp);
        let feelLike = Math.round(resp.main.feels_like);
        let weather = resp.weather[0].description;
        let pressure = resp.main.pressure;
        let wind = resp.wind.speed;
        let mainForecast = new Forecast(
          temp,
          feelLike,
          weather,
          pressure,
          wind,
          date,
          cityName,
          mainForecastContainer
        );

        mainForecast.create();
      })
      .catch(() => showError());
  }
  /// 4 DAYS FORECAST
  function getFutureForecast(cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=6e52176aeb950e806a1b0e159ffad374`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        for (let forecast of resp.list) {
          let time = forecast.dt_txt;
          let temp = Math.round(forecast.main.temp);
          let weather = forecast.weather[0].description;

          futureForecasts.push(
            new ForecastThumb(time, temp, weather, futureForecastsContainer)
          );
        }
      })
      .then(() => {
        for (let forecast of futureForecasts) {
          forecast.create();
        }
      })
      .then(() => resizer())
      .catch((err) => console.log(err));
  }
  ///SLIDER MOVE
  let counter = 0;
  const htmlObj = document.querySelector("html");
  const moveSlider = function () {
    let slideInRow =
      window.innerWidth < 600 && window.innerHeight > 320 ? 2 : 3;
    let singleSildeWidth = slider.offsetWidth / slideInRow;

    if (this.id == "right" && counter == 37) counter = 37;
    else if (this.id == "left" && counter == 0) counter = 0;
    else if (this.id == "right") counter++;
    else counter--;
    futureForecastsContainer.style.transform = `translateX(-${
      singleSildeWidth * counter
    }px)`;
  };
  rightArrow.addEventListener("click", moveSlider);
  leftArrow.addEventListener("click", moveSlider);
  ///RESIZE
  const resizer = function () {
    let slideInRow =
      window.innerWidth < 600 && window.innerHeight > 320 ? 2 : 3;
    let sliderWidth = slider.offsetWidth;
    futureForecastsContainer.style.width = `${
      sliderWidth * (40 / slideInRow)
    }px`;

    futureForecastsContainer.style.transform = `translateX(-${
      (sliderWidth / slideInRow) * counter
    }px)`;
  };
  window.addEventListener("resize", resizer);
  */
};
