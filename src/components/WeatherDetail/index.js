import React from "react";
import {
	Typography,
	Grid,
	makeStyles,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	colors
} from "@material-ui/core";
import MapDetail from "../MapDetail";

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 275
	},
	textRight: "right",
	cardHeader: {
		minHeight: 50,
		color: "#fff",
		backgroundColor: colors.blue[500]
	},
	cardSubHeader: {
		color: "#fff",
		fontWeight: 200
	}
}));

function WeatherDetail({ currentWeather, currentCity, ...props }) {
	const classes = useStyles();

	return (
		<div className="WeatherDetail">
			<Card className={classes.root}>
				{currentCity && (
					<>
						<CardHeader
							title={currentCity.name}
							subheader={currentCity.country}
							classes={{
								root: classes.cardHeader,
								subheader: classes.cardSubHeader
							}}
						/>
						<CardMedia
							className={classes.media}
							title={`${currentCity.name} map`}
						>
							<MapDetail currentCity={currentCity} />
						</CardMedia>
					</>
				)}
				<CardContent>
					{!currentCity && (
						<Typography variant="body1" component="p" color="textSecondary">
							Look for a city to see the weather
						</Typography>
					)}
					{currentCity && (
						<Grid container>
							<Grid item xs={6}>
								<Typography variant="h1" component="p">
									{currentWeather.temperature}°C
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									variant="subtitle2"
									component="p"
									color="textSecondary"
									align="right"
								>
									min: {currentWeather.temperature_min}°C
								</Typography>
								<Typography
									variant="subtitle2"
									component="p"
									color="textSecondary"
									align="right"
								>
									max: {currentWeather.temperature_max}°C
								</Typography>
								<Typography
									variant="body2"
									component="p"
									color="textSecondary"
									align="right"
								>
									Humidity: {currentWeather.humidity}%
								</Typography>
								<Typography
									variant="body2"
									component="p"
									color="textSecondary"
									align="right"
								>
									Pressure: {currentWeather.pressure} hPa
								</Typography>
							</Grid>
						</Grid>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default WeatherDetail;
