import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	map: {
		height: 200
	}
}));

function MapDetail({ currentCity }) {
	const classes = useStyles();
	console.log("MapDetail currentCity", currentCity);

	const position = currentCity
		? [currentCity.latitude, currentCity.longitude]
		: [0, 0];

	return (
		<div id="map-detail">
			{currentCity && (
				<Map center={position} zoom={13} className={classes.map}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={position} draggable={false} />
				</Map>
			)}
		</div>
	);
}

export default MapDetail;
