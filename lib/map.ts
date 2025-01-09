export const calculateRegion = ({
	userLatitude,
	userLongitude,
	destinationLatitude,
	destinationLongitude,
}: {
	userLatitude: number | null;
	userLongitude: number | null;
	destinationLatitude?: number | null;
	destinationLongitude?: number | null;
}) => {
	if (!userLatitude || !userLongitude) {
		// return mock location
		// 30.007438933997708, 31.3109925489764
		return {
			latitude: 30.0074,
			longitude: 31.311,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};
	}

	if (!destinationLatitude || !destinationLongitude) {
		return {
			latitude: userLatitude,
			longitude: userLongitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};
	}

	const minLat = Math.min(userLatitude, destinationLatitude);
	const maxLat = Math.max(userLatitude, destinationLatitude);
	const minLng = Math.min(userLongitude, destinationLongitude);
	const maxLng = Math.max(userLongitude, destinationLongitude);

	const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
	const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

	const latitude = (userLatitude + destinationLatitude) / 2;
	const longitude = (userLongitude + destinationLongitude) / 2;

	return {
		latitude,
		longitude,
		latitudeDelta,
		longitudeDelta,
	};
};
