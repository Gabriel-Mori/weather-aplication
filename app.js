const form = document.querySelector('[data-js="change-location"]');
const cityNameContainer = document.querySelector('[data-js="city-name"]');
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]');
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
);

const cityCard = document.querySelector('[data-js="city-card"]');
let imgTime = document.querySelector('[data-js="time"]');
let timeIcon = document.querySelector('[data-js="time-icon"]');
let epochTime = document.querySelector('[data-js="city-epochTime"]');
let format = dateFns;

const removeClassCityCard = () => {
  const removeClass = cityCard.classList.contains("d-none");

  if (removeClass) {
    cityCard.classList.remove("d-none");
  }
};

const cardImg = (isDayTime) => {
  if (isDayTime) {
    imgTime.src = "./src/day.svg";
  } else {
    imgTime.src = "./src/night.svg";
  }
};

const timeZone = (LocalObservationDateTime) => {
  const pressent = LocalObservationDateTime;
  const formatDate = dateFns.format(pressent, "HH:mm");
  return formatDate;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = e.target.city.value;
  const [{ Key, LocalizedName }] = await getCityData(inputValue);
  const [
    {
      WeatherText,
      Temperature,
      IsDayTime,
      WeatherIcon,
      EpochTime,
      LocalObservationDateTime,
    },
  ] = await getCityWeather(Key);
  const iconTime = `<img src="./src/icons/${WeatherIcon}.svg" />`;

  removeClassCityCard();

  epochTime.textContent = timeZone(LocalObservationDateTime);
  timeIcon.innerHTML = iconTime;
  cityNameContainer.textContent = LocalizedName;
  cityWeatherContainer.textContent = WeatherText;
  cityTemperatureContainer.textContent = Temperature.Metric.Value;

  form.reset();
});

console.log(dateFns);
