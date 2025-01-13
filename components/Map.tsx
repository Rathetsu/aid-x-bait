import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, {
	Marker,
	PROVIDER_DEFAULT,
	MapPressEvent,
} from "react-native-maps";

import { icons } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { setUserLocation } from "@/store/slices/locationSlice";
import { MapProps } from "@/types/type";

const Map: React.FC<MapProps> = ({ onMapPress, markerLocation }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasLocationPermission, setHasLocationPermission] = useState(false);
	const [startLocation, setStartLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const dispatch = useAppDispatch();

	// Request permissions and fetch user's current location
	useEffect(() => {
		const requestLocationPermission = async () => {
			try {
				// Request location permissions
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setHasLocationPermission(false);
					setError("Location permission denied");
					setLoading(false);
					return;
				}

				setHasLocationPermission(true);

				// Get the current location
				const location = await Location.getCurrentPositionAsync();

				// Reverse geocode to get the address
				const address = await Location.reverseGeocodeAsync({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				});

				// Update Redux store
				dispatch(
					setUserLocation({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						address:
							address?.[0]?.name && address?.[0]?.region
								? `${address[0].name}, ${address[0].region}`
								: "Unknown location",
					})
				);

				// Set the initial location
				setStartLocation({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				});
			} catch (err: any) {
				setError(err.message || "Failed to fetch location");
			} finally {
				setLoading(false);
			}
		};

		requestLocationPermission();
	}, [dispatch]);

	// Update `startLocation` whenever `markerLocation` changes
	useEffect(() => {
		if (markerLocation.latitude && markerLocation.longitude) {
			setStartLocation({
				latitude: markerLocation.latitude,
				longitude: markerLocation.longitude,
			});
		}
	}, [markerLocation]);

	const handlePress = async (event: MapPressEvent) => {
		try {
			const { latitude, longitude } = event.nativeEvent.coordinate;

			// Reverse geocode to get the address
			const address = await Location.reverseGeocodeAsync({
				latitude,
				longitude,
			});

			const formattedAddress =
				address?.[0]?.name && address?.[0]?.region
					? `${address[0].name}, ${address[0].region}`
					: "Unknown location";

			onMapPress(latitude, longitude, formattedAddress);
		} catch (err: any) {
			console.error("Error during reverse geocoding:", err.message);
		}
	};

	// Set the region to `startLocation` or default if not available
	const region = {
		latitude: startLocation?.latitude || 0,
		longitude: startLocation?.longitude || 0,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};

	if (loading) {
		return (
			<View className="flex justify-center items-center w-full h-full">
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex justify-center items-center w-full h-full">
				<Text>Error: {error}</Text>
			</View>
		);
	}

	if (!hasLocationPermission) {
		return (
			<View className="flex justify-center items-center w-full h-full">
				<Text>
					Location access is denied. Please enable location services from your
					device settings.
				</Text>
			</View>
		);
	}

	return (
		<View className="flex-1">
			<MapView
				provider={PROVIDER_DEFAULT}
				style={{ width: "100%", height: "100%", borderRadius: 20 }}
				region={region} // Dynamically update the map region
				showsUserLocation={true}
				rotateEnabled={false}
				onPress={handlePress}
			>
				{/* Render the marker dynamically */}
				{startLocation && (
					<Marker
						coordinate={{
							latitude: startLocation.latitude,
							longitude: startLocation.longitude,
						}}
						title="Selected Location"
						image={icons.pin}
					/>
				)}
			</MapView>
		</View>
	);
};

export default Map;
