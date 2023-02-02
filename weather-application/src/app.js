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

const showCityCard = () => {
  const removeClass = cityCard.classList.contains("d-none");
  if (removeClass) {
    cityCard.classList.remove("d-none");
  }
};

const timeZone = (LocalObservationDateTime) => {
  const pressent = LocalObservationDateTime;
  const formatDate = dateFns.format(pressent, "HH:mm");
  return formatDate;
};

const showCityWeatherInfo = async (cityName) => {
  const [{ Key, LocalizedName }] = await getCityData(cityName);
  const [{ WeatherText, Temperature, WeatherIcon, LocalObservationDateTime }] =
    await getCityWeather(Key);
  const iconTime = `<img src="./src/icons/${WeatherIcon}.svg" />`;

  epochTime.textContent = timeZone(LocalObservationDateTime);
  timeIcon.innerHTML = iconTime;
  cityNameContainer.textContent = LocalizedName;
  cityWeatherContainer.textContent = WeatherText;
  cityTemperatureContainer.textContent = Temperature.Metric.Value;

  showCityCard();
};

const showLocalStorage = () => {
  const city = localStorage.getItem("city");
  if (city) {
    showCityWeatherInfo(city);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = e.target.city.value;
  showCityWeatherInfo(inputValue);

  localStorage.setItem("city", inputValue);

  form.reset();
});
showLocalStorage();

console.log(dateFns);
