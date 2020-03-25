import { urlBaseWeather, apiKey } from "../constants/apiUrl";

const getUrlWeatherByCityId = cityId => {
	return `${urlBaseWeather}weather?id=${cityId}&appid=${apiKey}`;
};

export default getUrlWeatherByCityId;
