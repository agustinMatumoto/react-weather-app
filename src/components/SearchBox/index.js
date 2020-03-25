// import fetch from "cross-fetch";
import React, { useState, useEffect, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
	CircularProgress,
	Grid,
	Typography,
	makeStyles
} from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import throttle from "lodash/throttle";
import getWeatherByCityLatLon from "../../services/getWeatherByCityLatLon";

const useStyles = makeStyles(theme => ({
	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2)
	}
}));

export default function Asynchronous({
	setCurrentWeather,
	currentCity,
	setCurrentCity,
	lastCities,
	setLastCities
}) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = event => {
		setInputValue(event.target.value);
	};

	function setCity(e, city) {
		if (city) {
			const includedCity = lastCities.some(element => element.id === city.id);
			if (!includedCity) {
				if (lastCities.length >= 5) {
					lastCities.shift();
				}
				lastCities.push(city);
				setLastCities(lastCities);
			}
		}
		setCurrentCity(city);
	}

	async function fetchWeather(city) {
		if (city) {
			const weatherData = await getWeatherByCityLatLon(
				city.latitude,
				city.longitude
			);
			setCurrentWeather(weatherData);
		}
	}

	const fetchCity = useMemo(
		() =>
			throttle((request, callback) => {
				(async () => {
					setLoading(true);
					const response = await fetch(
						`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${request.input}&limit=10&offset=0&hateoasMode=false`,
						{
							method: "GET",
							headers: {
								"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
								"x-rapidapi-key":
									"720cd4b518msh1222072d0484c4cp17778bjsn169b7dd4691b"
							}
						}
					);
					const responseJson = await response.json();
					const cities = responseJson.data;
					callback(cities);
					setLoading(false);
					return;
				})();
			}, 500),
		[]
	);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		let active = true;

		if (inputValue === "") {
			setOptions([]);
			return undefined;
		}

		fetchCity({ input: inputValue }, results => {
			if (active) {
				setOptions(results || []);
			}
		});

		return () => {
			active = false;
		};
	}, [inputValue]);

	useEffect(() => {
		fetchWeather(currentCity);
	}, [currentCity]);

	return (
		<Autocomplete
			id="asynchronous-demo"
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onChange={(e, city) => setCity(e, city)}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={option => option.name}
			options={options}
			noOptionsText={"No options. Start typing a city name."}
			loading={loading}
			renderInput={params => (
				<TextField
					{...params}
					label="Add a city"
					variant="outlined"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						)
					}}
					onChange={handleChange}
				/>
			)}
			renderOption={option => {
				return (
					<Grid container alignItems="center">
						<Grid item>
							<LocationOn className={classes.icon} />
						</Grid>
						<Grid item xs>
							<span>{option.city}</span>
							<Typography variant="body2" color="textSecondary">
								{option.country}
							</Typography>
						</Grid>
					</Grid>
				);
			}}
		/>
	);
}
