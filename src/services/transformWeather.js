import convert from "convert-units";

const getTemperature = (temperature, unitFrom, unitTo) => {
	return parseFloat(
		Number(
			convert(temperature)
				.from(unitFrom)
				.to(unitTo)
		).toFixed(0)
	);
};

const transformWeather = weatherData => {
	const { humidity, temp, temp_min, temp_max, pressure } = weatherData.main;
	const temperature = getTemperature(temp, "K", "C");
	const temperature_min = getTemperature(temp_min, "K", "C");
	const temperature_max = getTemperature(temp_max, "K", "C");

	const data = {
		temperature,
		temperature_min,
		temperature_max,
		humidity,
		pressure
	};

	return data;
};

export default transformWeather;
