import { urlBaseWeather, apiKey } from "../constants/apiUrl";
import transformWeather from "./transformWeather";

function getWeatherByCityLatLon(lat, lon) {
	const apiWeather = `${urlBaseWeather}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
	return new Promise(resolvePromise => {
		fetch(apiWeather)
			.then(res => {
				return res.json();
			})
			.then(data => {
				const newWeather = transformWeather(data);
				resolvePromise(newWeather);
			});
	});
}

export default getWeatherByCityLatLon;
