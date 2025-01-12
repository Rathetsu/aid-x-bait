import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectLocation, setUserLocation } from "@/store/slices/locationSlice";

const Map = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasLocationPermission, setHasLocationPermission] = useState(false);

	const dispatch = useAppDispatch();
	const { userLatitude, userLongitude, userAddress } =
		useAppSelector(selectLocation);

	// useEffect(() => {
	// 	const requestLocationPermission = async () => {
	// 		try {
	// 			// Request location permissions
	// 			const { status } = await Location.requestForegroundPermissionsAsync();
	// 			if (status !== "granted") {
	// 				console.log("Status:", status);
	// 				setHasLocationPermission(false);
	// 				setError("Location permission denied");
	// 				setLoading(false);
	// 				return;
	// 			}

	// 			setHasLocationPermission(true);

	// 			// Get current location
	// 			const location = await Location.getCurrentPositionAsync();

	// 			// Reverse geocode to get address
	// 			const address = await Location.reverseGeocodeAsync({
	// 				latitude: location.coords.latitude,
	// 				longitude: location.coords.longitude,
	// 			});

	// 			// Update Redux store
	// 			dispatch(
	// 				setUserLocation({
	// 					latitude: location.coords.latitude,
	// 					longitude: location.coords.longitude,
	// 					address:
	// 						address?.[0]?.name && address?.[0]?.region
	// 							? `${address[0].name}, ${address[0].region}`
	// 							: "Unknown location",
	// 				})
	// 			);
	// 		} catch (err: any) {
	// 			setError(err.message || "Failed to fetch location");
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	requestLocationPermission();
	// }, [dispatch]);

	const checkPermissions = async () => {
		const { status } = await Location.getForegroundPermissionsAsync();
		console.log("Foreground Permissions:", status);

		const { status: askStatus } =
			await Location.requestForegroundPermissionsAsync();
		console.log("Request Foreground Permissions:", askStatus);
	};

	useEffect(() => {
		checkPermissions();
	}, []);

	const region = {
		latitude: userLatitude || 0,
		longitude: userLongitude || 0,
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
				<Text>Error z: {error}</Text>
			</View>
		);
	}

	if (!hasLocationPermission) {
		return (
			<View className="flex justify-center items-center w-full h-full">
				<Text>
					AidXBait does not have permission to access your location. Please
					enable location services from your device settings.
				</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<MapView
				provider={PROVIDER_DEFAULT}
				style={{ width: "100%", height: "100%", borderRadius: 20 }}
				tintColor="black"
				mapType="mutedStandard"
				showsPointsOfInterest={false}
				initialRegion={region}
				showsUserLocation={true}
				userInterfaceStyle="light"
			></MapView>
			{/* Display user address */}
			{userAddress && (
				<View
					style={{
						position: "absolute",
						bottom: 20,
						width: "100%",
						alignItems: "center",
					}}
				>
					<Text
						style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8 }}
					>
						Address: {userAddress}
					</Text>
				</View>
			)}
		</View>
	);
};

export default Map;
