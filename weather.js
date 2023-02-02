const apiKey = "Va2EO9mqXk0tDHPehMm7sqVCS89bV72X";
const baseAPI = "http://dataservice.accuweather.com/";

const getCityUrl = (cityName) =>
  `${baseAPI}locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;

const getWeatherUrl = (cityKey) =>
  `${baseAPI}currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-br`;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Não foi possivel obter dados da API");
    }

    return response.json();
  } catch ({ name, message }) {
    alert(`${name}: ${message}`);
  }
};

const getCityData = (cityName) => fetchData(getCityUrl(cityName));

const getCityWeather = (cityName) => fetchData(getWeatherUrl(cityName));
