import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
	Text,
	View,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createAddress } from "@/api/address";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { icons } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { selectLocation } from "@/store/slices/locationSlice";
import { selectUser } from "@/store/slices/userSlice";

const Address = () => {
	const { userAddress } = useAppSelector(selectLocation);
	const { user } = useAppSelector(selectUser);
	const { getToken } = useAuth();

	console.log("userAddress", userAddress);
	console.log("user", user);

	const [area, setArea] = useState(
		userAddress ?? "Choose a location by tapping on the map"
	);
	const [markerLocation, setMarkerLocation] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [buildingName, setBuildingName] = useState("");
	const [apartmentNo, setApartmentNo] = useState("");
	const [floor, setFloor] = useState("");
	const [street, setStreet] = useState("");
	const [additionalDirections, setAdditionalDirections] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(user?.phone ?? "");
	const [label, setLabel] = useState("");
	const [selectedTab, setSelectedTab] = useState("Apartment");

	// Function to handle map marker change
	const handleMapPress = (
		latitude: number,
		longitude: number,
		address: string
	) => {
		setArea(address);
		setMarkerLocation({ latitude, longitude });
	};

	// Function to handle location from search input
	const handleLocationSearch = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setArea(location.address);
		setMarkerLocation({
			latitude: location.latitude,
			longitude: location.longitude,
		});
	};

	const handleSaveAddress = async () => {
		console.log("area: ", location);
		return;
		const token = await getToken();
		const data = {
			patient_id: user!.patientId,
			address_type: selectedTab,
			address_label: label,
			latitude: markerLocation.latitude,
			longitude: markerLocation.longitude,
			governorate: area,
			city: area,
			street: street,
			buildingName,
			apartmentNo,
			floor,
			additionalDirections,
			phoneNumber,
			label,
		};
		await createAddress(data, token!);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Back button */}
			<View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
				<TouchableOpacity onPress={() => router.back()}>
					<View className="w-10 h-10 bg-white rounded-full items-center justify-center">
						<Image
							source={icons.backArrow}
							resizeMode="contain"
							className="w-6 h-6"
						/>
					</View>
				</TouchableOpacity>
			</View>

			{/* Google Places search */}
			<View className="my-3 mx-2">
				<Text className="mt-5 mx-2 text-lg font-JakartaSemiBold mb-3 text-gray-500">
					Search for your location
				</Text>
				<GoogleTextInput
					icon={icons.target}
					initialLocation={userAddress ?? "Choose your location"}
					containerStyle="bg-neutral-100"
					textInputBackgroundColor="#f5f5f5"
					handlePress={handleLocationSearch}
				/>
			</View>

			{/* Map Section */}
			<View className="h-64 mb-2 mx-3">
				<Map onMapPress={handleMapPress} markerLocation={markerLocation} />
			</View>

			{/* Form Section */}
			<ScrollView
				contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
			>
				{/* Area Input */}
				<Text className="mb-2 text-base font-semibold">Area</Text>
				<View className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100">
					<Text className="text-gray-700">{area}</Text>
					<Text className="text-xs text-gray-500">
						Tap on the map above to change location
					</Text>
				</View>

				{/* Tabbed Container */}
				<View className="flex-row mb-4">
					<TouchableOpacity
						className={`flex-1 p-3 rounded-lg ${
							selectedTab === "Apartment" ? "bg-primary-500" : "bg-gray-200"
						}`}
						onPress={() => setSelectedTab("Apartment")}
					>
						<Text
							className={`text-center ${
								selectedTab === "Apartment"
									? "text-white font-semibold"
									: "text-gray-700"
							}`}
						>
							Apartment
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`flex-1 p-3 rounded-lg ml-2 ${
							selectedTab === "House" ? "bg-primary-500" : "bg-gray-200"
						}`}
						onPress={() => setSelectedTab("House")}
					>
						<Text
							className={`text-center ${
								selectedTab === "House"
									? "text-white font-semibold"
									: "text-gray-700"
							}`}
						>
							House
						</Text>
					</TouchableOpacity>
				</View>

				{/* Apartment Form */}
				{selectedTab === "Apartment" && (
					<>
						{/* Building Name */}
						<TextInput
							placeholder="Building name"
							placeholderTextColor="#9CA3AF"
							value={buildingName}
							onChangeText={setBuildingName}
							className="border border-gray-300 rounded-lg p-3 mb-4"
						/>

						{/* Apartment No and Floor */}
						<View className="flex-row gap-x-3">
							<TextInput
								placeholder="Apt. no."
								placeholderTextColor="#9CA3AF"
								value={apartmentNo}
								onChangeText={setApartmentNo}
								className="flex-1 border border-gray-300 rounded-lg p-3 mb-4"
							/>
							<TextInput
								placeholder="Floor"
								placeholderTextColor="#9CA3AF"
								value={floor}
								onChangeText={setFloor}
								className="flex-1 border border-gray-300 rounded-lg p-3 mb-4"
							/>
						</View>
					</>
				)}

				{/* House Form */}
				{selectedTab === "House" && (
					<>
						{/* Building Name */}
						<TextInput
							placeholder="House"
							placeholderTextColor="#9CA3AF"
							value={buildingName}
							onChangeText={setBuildingName}
							className="border border-gray-300 rounded-lg p-3 mb-4"
						/>
						{/* Street */}
						<TextInput
							placeholder="Street"
							placeholderTextColor="#9CA3AF"
							value={street}
							onChangeText={setStreet}
							className="border border-gray-300 rounded-lg p-3 mb-4"
						/>
					</>
				)}

				{/* Shared Form Fields */}
				{/* Additional Directions */}
				<TextInput
					placeholder="Additional directions (optional)"
					placeholderTextColor="#9CA3AF"
					value={additionalDirections}
					onChangeText={setAdditionalDirections}
					className="border border-gray-300 rounded-lg p-3 mb-4"
				/>

				{/* Phone Number */}
				<TextInput
					placeholder="Phone number"
					placeholderTextColor="#9CA3AF"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					className="border border-gray-300 rounded-lg p-3 mb-4"
				/>

				{/* Address Label */}
				<TextInput
					placeholder="Address label (optional)"
					placeholderTextColor="#9CA3AF"
					value={label}
					onChangeText={setLabel}
					className="border border-gray-300 rounded-lg p-3 mb-4"
				/>

				{/* Save Address Button */}
				<TouchableOpacity
					className="bg-primary-500 rounded-lg p-4 items-center"
					onPress={handleSaveAddress}
				>
					<Text className="text-white font-semibold text-base">
						Save address
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Address;
