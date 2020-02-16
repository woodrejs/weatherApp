window.onload=function()
{
///VARIABLES
    const futureForecastsContainer = document.querySelector('#futureForecastsContainer');
    const mainForecastContainer = document.querySelector('#mainForecastContainer');
    const leftArrow = document.querySelector('#left');
    const rightArrow = document.querySelector('#right');
    const searchButton = document.querySelector('#search');
    const searchZone = document.querySelector('#searchZone');
    const slider = document.querySelector('#slider');
    const futureForecasts = [];
    const date = getDate();
    const moveLeft = ()=>{
        leftArrow.removeEventListener('click',moveLeft);
        moveSlider(futureForecastsContainer,-1);
        futureForecastsContainer.addEventListener('transitionend',()=>leftArrow.addEventListener('click',moveLeft));
    };
    const moveRight = ()=>{
        rightArrow.removeEventListener('click',moveRight);
        moveSlider(futureForecastsContainer,1);
        futureForecastsContainer.addEventListener('transitionend',()=>rightArrow.addEventListener('click',moveRight));
    };
    const searchCity = ()=>search(searchZone,futureForecastsContainer,mainForecastContainer,futureForecasts);
    let cityName = getCityName();
///LISTENERS
    rightArrow.addEventListener('click',moveRight);
    leftArrow.addEventListener('click',moveLeft);
    searchButton.addEventListener('click',searchCity);
    searchZone.addEventListener('keyup',(e)=>e.keyCode === 13 ? search(searchZone,futureForecastsContainer,mainForecastContainer,futureForecasts): false);
////ERROR MESSAGE
    function showError(obj1,obj2)
    {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.innerHTML = 'Wprowadziłeś niepoprawną nazwę miasta. Spróbuj ponownie.'
        obj1.appendChild(errorMessage);
        //REMOVE OPACITY TO SLIDER WHEN ERROR MESSAGE
        obj2.style.backgroundColor = 'rgba(38, 29, 38, 0.8)';
    }
///SEARCH
    function search(input,obj1,obj2,array)
    {
        cityName = input.value;
        clear(obj1,obj2,array);
        getTodayForecast(cityName);
        getFutureForecast(cityName);
        //ADD OPACITY TO SLIDER WHEN ERROR MESSAGE
        slider.style.backgroundColor = 'rgba(38, 29, 38, 0)';
    }
///CLEAR APP
    function clear(obj1,obj2,array)
    {
        obj1.innerHTML = '';
        obj2.innerHTML = '';
        array.length = 0;
    }
///GET TRANSLATEX
    function getTranslateX(myElement) {
        let style = window.getComputedStyle(myElement);
        let matrix = new WebKitCSSMatrix(style.webkitTransform);
        return matrix.m41;
    }
///DATE
    function getDate()
    {
        let date = new Date();
        let month = date.getMonth()<10 ? '0' + (date.getMonth()+1) : date.getMonth();
        let result= `${date.getFullYear()}-${month}-${date.getDate()}`;
        return result;
    }
///SET ICON
    function setIcon(weather,img)
    {
        switch (weather) {
            case 'clear sky':
                img.setAttribute('src','icons/clear_sky.png');
              break;
            case 'few clouds':
                img.setAttribute('src','icons/few_clouds.png');
              break;
            case 'scattered clouds':
                img.setAttribute('src','icons/scattered_clouds.png');
              break;
            case 'overcast clouds':
                img.setAttribute('src','icons/scattered_clouds.png');
              break;
            case 'broken clouds':
                img.setAttribute('src','icons/broken_clouds.png');
              break;
            case 'shower rain':
                img.setAttribute('src','icons/shower_rain.png');
              break;
            case 'light rain':
                img.setAttribute('src','icons/shower_rain.png');
              break;
            case 'rain':
                img.setAttribute('src','icons/rain.png');
              break;
            case 'thunderstorm':
                img.setAttribute('src','icons/thunderstorm.png');
              break;
            case 'snow':
                img.setAttribute('src','icons/snow.png');
              break;
            case 'light snow':
                img.setAttribute('src','icons/snow.png');
              break;
            default:
                img.setAttribute('src','icons/mist.png');
              break;
          }
    }
//MOVE SLIDER
    function moveSlider(obj,direction)
    {
        const slideWidth = parseInt(window.getComputedStyle(obj.childNodes[0]).width);
        const slideMargin = parseInt(window.getComputedStyle(obj.childNodes[0]).marginRight)*2.2;
        const slideTotalWidth = (slideWidth + slideMargin);
        const sliderTranslateX = getTranslateX(obj);
        
        console.log(Math.abs(sliderTranslateX));

        if(Math.abs(sliderTranslateX) < 1 && direction == -1)
            return;
        else if(Math.abs(sliderTranslateX) > slideTotalWidth*36 && direction == 1)
            return;
        else
            obj.style.transform = `translateX(${sliderTranslateX - slideTotalWidth*direction}px)`;
    }
///FORECAST
    function Forecast(temp,feelLike,weather,pressure,wind,date,name=null,obj)
    {
        this.temp = `${temp} &#8451`;
        this.name = name;
        this.date = date;
        this.feelLike =  `${feelLike} &#8451`;
        this.weather = weather;
        this.pressure = `${pressure} hPa`;
        this.wind = `${wind} km/h`;
        this.obj = obj;

        this.thumbnail = document.createElement('img');
        this.nameSpan = document.createElement('span');
        this.tempSpan = document.createElement('span');
        this.feelLikeSpan = document.createElement('span');
        this.dataSpan = document.createElement('span');
        this.windSpan = document.createElement('span');
        this.pressureSpan = document.createElement('span');

        this.create = function()
        {
            setIcon(this.weather,this.thumbnail);
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
        }
    }
///FORECAST THUMBNAIL
    function ForecastThumb(time,temp,weather,obj)
    {
        this.time = time.split(' ');
        this.date = this.time[0];
        this.hour = this.time[1];
        this.temp = `${temp} &#8451`;
        this.weather = weather;

        this.mainContainer = document.createElement('div');
        this.dataSpan = document.createElement('span');
        this.hourSpan = document.createElement('span');
        this.tempSpan = document.createElement('span');
        this.thumbnail = document.createElement('img');

        this.create = function()
        {
            this.dataSpan.innerHTML = this.date;
            this.hourSpan.innerHTML = this.hour;
            this.tempSpan.innerHTML = this.temp;
            setIcon(this.weather,this.thumbnail);

            obj.appendChild(this.mainContainer);
            this.mainContainer.appendChild(this.dataSpan);
            this.mainContainer.appendChild(this.thumbnail);
            this.mainContainer.appendChild(this.tempSpan);
            this.mainContainer.appendChild(this.hourSpan);
        }
    }
/// TODAY FORECAST
    function getTodayForecast(cityName)
    {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8d04b2f8b25f0fa25cce7eb5e3c377e4`)
        .then((resp) => resp.json())
        .then((resp) => {
            
          let temp = Math.round(resp.main.temp);
          let feelLike = Math.round(resp.main.feels_like);
          let weather = resp.weather[0].description;
          let pressure = resp.main.pressure;
          let wind = resp.wind.speed;
          let mainForecast = new Forecast(temp,feelLike,weather,pressure,wind,date,cityName,mainForecastContainer);
          
          mainForecast.create();
        })
        .catch(err=>showError(mainForecastContainer,slider));
    }
/// 4 DAYS FORECAST
    function getFutureForecast(cityName)
    {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=6e52176aeb950e806a1b0e159ffad374`)
        .then(resp=>resp.json())
        .then((resp)=>{
            
            for(let forecast of resp.list)
            {
                let time = forecast.dt_txt;
                let temp = Math.round(forecast.main.temp);
                let weather = forecast.weather[0].description;
    
                futureForecasts.push(new ForecastThumb(time,temp,weather,futureForecastsContainer));
            }
        })
        .then(()=>{
    
            for(let forecast of futureForecasts)
            {
                forecast.create();
            }
        })
        .catch(err=>console.log(err));
    } 
///GEOLOKALIZATION
    function getCityName()
    {
        navigator.geolocation.getCurrentPosition((pos)=>{

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=AIzaSyB9YJgnJbfaapYiytWhZRB7vLOWv8J8B9E`)
            .then(resp=>resp.json())
            .then(resp=>{
                 const cityName =  resp.plus_code.compound_code.split(' ')[1].slice(0,-1);
                 return cityName;
            })
            .then(cityName=>{
                getTodayForecast(cityName);
                getFutureForecast(cityName);
            })
            .catch(err=>console.log(err));
        })
    }
}

