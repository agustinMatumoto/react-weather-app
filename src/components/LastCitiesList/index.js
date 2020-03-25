import React, { useState, useEffect } from "react";
import {
	Paper,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Box,
	Divider
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

function LastCitiesList({
	currentCity,
	setCurrentCity,
	lastCities,
	setLastCities,
	...props
}) {
	const [updated, setUpdated] = useState();

	useEffect(() => {
		setUpdated(true);
		return setUpdated(false);
	}, [lastCities]);

	function deleteCity(index) {
		const _lastCities = [...lastCities];
		_lastCities.splice(index, 1);
		setLastCities(_lastCities);
	}

	function deleteAllCities() {
		setLastCities([]);
	}

	return (
		<div className="LastCitiesList">
			<Box my={4}>
				<Typography variant="h6">Your recent searches</Typography>
			</Box>
			<Paper>
				<div>
					<List>
						{lastCities.length < 1 && (
							<ListItem>
								<Typography variant="body1" component="p" color="textSecondary">
									Here you will see your recent searches
								</Typography>
							</ListItem>
						)}
						{lastCities.map((city, index) => (
							<ListItem
								button
								key={city.id}
								onClick={() => setCurrentCity(city)}
							>
								<ListItemText primary={city.name} secondary={city.country} />
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => deleteCity(index)}
									>
										<Delete />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						))}
						{lastCities.length > 0 && (
							<>
								<Divider />
								<ListItem button onClick={() => deleteAllCities()}>
									<ListItemText primary={"Delete all"} />
								</ListItem>
							</>
						)}
					</List>
				</div>
			</Paper>
		</div>
	);
}

export default LastCitiesList;
