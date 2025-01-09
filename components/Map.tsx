import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import { useAppSelector } from "@/store/hooks";
import { selectLocation } from "@/store/slices/locationSlice";

const Map = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { userLatitude, userLongitude } = useAppSelector(selectLocation);
	const region = {
		latitude: userLatitude!,
		longitude: userLongitude!,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};

	if (loading || (!userLatitude && !userLongitude))
		return (
			<View className="flex justify-between items-center w-full">
				<ActivityIndicator size="small" color="#000" />
			</View>
		);

	if (error)
		return (
			<View className="flex justify-between items-center w-full">
				<Text>Error: {error}</Text>
			</View>
		);

	return (
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
	);
};

export default Map;
