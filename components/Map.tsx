import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import { icons } from "@/constants";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectLocation, setUserLocation } from "@/store/slices/locationSlice";

const Map = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasLocationPermission, setHasLocationPermission] = useState(false);

	const dispatch = useAppDispatch();
	const { userLatitude, userLongitude } = useAppSelector(selectLocation);

	useEffect(() => {
		const requestLocationPermission = async () => {
			try {
				// Request location permissions
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					console.log("Status:", status);
					setHasLocationPermission(false);
					setError("Location permission denied");
					setLoading(false);
					return;
				}

				setHasLocationPermission(true);

				// Get current location
				const location = await Location.getCurrentPositionAsync();

				// Reverse geocode to get address
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
			} catch (err: any) {
				setError(err.message || "Failed to fetch location");
			} finally {
				setLoading(false);
			}
		};

		requestLocationPermission();
	}, [dispatch]);

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
		<View className="flex-1">
			<MapView
				provider={PROVIDER_DEFAULT}
				style={{ width: "100%", height: "100%", borderRadius: 20 }}
				tintColor="black"
				mapType="mutedStandard"
				showsPointsOfInterest={false}
				initialRegion={region}
				showsUserLocation={true}
				userInterfaceStyle="light"
				rotateEnabled={false}
				toolbarEnabled={false}
				loadingEnabled={true}
				loadingIndicatorColor="#666666"
				minZoomLevel={10}
				maxZoomLevel={20}
				cameraZoomRange={{
					minCenterCoordinateDistance: 50,
					maxCenterCoordinateDistance: 1000,
				}}
			>
				<Marker
					coordinate={{
						latitude: userLatitude || 0,
						longitude: userLongitude || 0,
					}}
					title="You are here"
					image={icons.pin}
				/>
			</MapView>
		</View>
	);
};

export default Map;
