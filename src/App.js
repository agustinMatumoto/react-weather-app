import React, { useState } from "react";
import {
	Container,
	responsiveFontSizes,
	createMuiTheme,
	Grid,
	Box
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import SearchBox from "./components/SearchBox";
import WeatherDetail from "./components/WeatherDetail";
import LastCitiesList from "./components/LastCitiesList";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
	const [currentCity, setCurrentCity] = useState();
	const [currentWeather, setCurrentWeather] = useState({});
	const [lastCities, setLastCities] = useLocalStorage("lastCities", []);

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Container fixed>
					<Grid container spacing={3}>
						<Grid item xs sm={7} md={5}>
							<Box my={2}>
								<SearchBox
									setCurrentWeather={setCurrentWeather}
									currentCity={currentCity}
									setCurrentCity={setCurrentCity}
									lastCities={lastCities}
									setLastCities={setLastCities}
								/>
							</Box>
							<Box my={2}>
								<WeatherDetail
									currentWeather={currentWeather}
									currentCity={currentCity}
								/>
							</Box>
						</Grid>
						<Grid item xs sm={5} md={5}>
							<Box my={2}>
								<LastCitiesList
									currentCity={currentCity}
									setCurrentCity={setCurrentCity}
									lastCities={lastCities}
									setLastCities={setLastCities}
								/>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</div>
		</ThemeProvider>
	);
}

export default App;
