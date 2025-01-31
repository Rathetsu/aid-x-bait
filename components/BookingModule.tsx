import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
	StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { icons } from "@/constants";
import { BookingModuleProps } from "@/types/type";

import DatePicker from "./DatePicker";

const BookingModule = ({ onPressBookVisit }: BookingModuleProps) => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [selectedSpeciality, setSelectedSpeciality] = useState<string>("Ortho");
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("(8-12) AM");
	const [isDropdownInFocus, setIsDropdownInFocus] = useState<boolean>(false);
	const [specialist, setSpecialist] = useState<string>("Male");
	const [note, setNote] = useState<string>("");
	const [frontID, setFrontID] = useState<string | null>(null);
	const [backID, setBackID] = useState<string | null>(null);
	const [photoWithID, setPhotoWithID] = useState<string | null>(null);

	const specialities = ["Ortho", "General", "Neuro"];
	const timeSlots = ["(8-12) AM", "(1-6) PM", "(7-11) PM"];

	const isConfirmDisabled =
		!selectedDate ||
		!selectedSpeciality ||
		!selectedTimeSlot ||
		(specialist === "Female" && (!frontID || !backID || !photoWithID));

	const pickImage = async (setImage: (uri: string | null) => void) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<ScrollView className="flex-1 bg-white p-4">
			{/* Address */}
			<View className="gap-2">
				<View className="flex-row justify-between">
					<View>
						<Text className="text-lg font-JakartaSemiBold text-black mb-2">
							Address
						</Text>
						<View className="flex flex-row items-center">
							<Text className="text-gray-600">
								El-Abour Bldgs 11 6th Floor.
							</Text>
							<TouchableOpacity onPress={() => router.push("/(self)/address")}>
								<Text className="text-blue-500 ml-3">Change</Text>
							</TouchableOpacity>
						</View>
					</View>

					<Image
						source={icons.location}
						className="w-12 h-12"
						resizeMode="contain"
					/>
				</View>
				<View className="border-b border-gray-300 my-6"></View>
			</View>

			{/* Select Date */}
			<DatePicker
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>

			{/* Booking Information */}
			<View className="mb-6">
				<Text className="text-lg font-bold text-black">
					Booking Information
				</Text>
				<View className="mt-4">
					{/* Speciality */}
					<Text className="text-base text-black mb-2">Speciality</Text>
					<View className="flex-row flex-wrap">
						{specialities.map((item) => (
							<TouchableOpacity
								key={item}
								className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
									selectedSpeciality === item ? "bg-primary-400" : "bg-gray-200"
								}`}
								onPress={() => setSelectedSpeciality(item)}
							>
								<Text
									className={`text-sm ${
										selectedSpeciality === item ? "text-white" : "text-gray-600"
									}`}
								>
									{item}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Time Slots */}
					<Text className="text-base text-black mb-2 mt-4">Time Slots</Text>
					<View className="flex-row flex-wrap">
						{timeSlots.map((slot) => (
							<TouchableOpacity
								key={slot}
								className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
									selectedTimeSlot === slot ? "bg-primary-400" : "bg-gray-200"
								}`}
								onPress={() => setSelectedTimeSlot(slot)}
							>
								<Text
									className={`text-sm ${
										selectedTimeSlot === slot ? "text-white" : "text-gray-600"
									}`}
								>
									{slot}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>

			{/* Additional Information */}
			<View className="mb-6">
				<Text className="text-lg font-bold text-black">
					Additional Information
				</Text>
				<View className="mt-4">
					{/* Choose Specialist's Gender */}
					<Text className="text-base text-black mb-2">Specialist's Gender</Text>
					<View className="border rounded-lg bg-gray-100 border-gray-300">
						<Dropdown
							style={[
								styles.dropdown,
								isDropdownInFocus && { borderColor: "blue" },
							]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={[
								{ label: "Male", value: "Male" },
								{ label: "Female", value: "Female" },
							]}
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder={!isDropdownInFocus ? "Select item" : "..."}
							value={specialist}
							onFocus={() => setIsDropdownInFocus(true)}
							onBlur={() => setIsDropdownInFocus(false)}
							onChange={(item) => {
								setSpecialist(item.value);
								setIsDropdownInFocus(false);
							}}
						/>
					</View>

					{/* Conditional Rendering for Female */}
					{specialist === "Female" && (
						<View className="mt-4">
							<Text className="text-base text-black mb-2">
								Take a photo with the camera or upload your identification
							</Text>
							<View className="flex-row justify-between">
								<View className="flex-1 mr-2">
									<Text className="text-sm text-gray-600 mb-1">
										Front Identification
									</Text>
									<TouchableOpacity
										className="h-24 bg-gray-100 border border-gray-300 rounded-lg items-center justify-center"
										onPress={() => pickImage(setFrontID)}
									>
										{frontID ? (
											<Image
												source={{ uri: frontID }}
												className="w-full h-full rounded-lg"
											/>
										) : (
											<Text className="text-sm text-gray-500">
												Take or Upload Photo
											</Text>
										)}
									</TouchableOpacity>
								</View>
								<View className="flex-1 mr-2">
									<Text className="text-sm text-gray-600 mb-1">
										Back Identification
									</Text>
									<TouchableOpacity
										className="h-24 bg-gray-100 border border-gray-300 rounded-lg items-center justify-center"
										onPress={() => pickImage(setBackID)}
									>
										{backID ? (
											<Image
												source={{ uri: backID }}
												className="w-full h-full rounded-lg"
											/>
										) : (
											<Text className="text-sm text-gray-500">
												Take or Upload Photo
											</Text>
										)}
									</TouchableOpacity>
								</View>
								<View className="flex-1">
									<Text className="text-sm text-gray-600 mb-1">
										Photo with ID
									</Text>
									<TouchableOpacity
										className="h-24 bg-gray-100 border border-gray-300 rounded-lg items-center justify-center"
										onPress={() => pickImage(setPhotoWithID)}
									>
										{photoWithID ? (
											<Image
												source={{ uri: photoWithID }}
												className="w-full h-full rounded-lg"
											/>
										) : (
											<Text className="text-sm text-gray-500">
												Take or Upload Photo
											</Text>
										)}
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)}

					{/* Note */}
					<Text className="text-base text-black mb-2 mt-4">Note</Text>
					<TextInput
						value={note}
						onChangeText={setNote}
						placeholder="Type your notes here"
						placeholderTextColor="#A0A0A0"
						className="h-20 border rounded-lg bg-gray-100 border-gray-300 p-2 text-sm text-gray-600"
						multiline
					/>
				</View>
			</View>

			{/* Book a Visit Button */}
			<TouchableOpacity
				onPress={() => onPressBookVisit()}
				disabled={isConfirmDisabled}
				className={`py-4 rounded-lg flex-row items-center justify-center shadow-md 
					${isConfirmDisabled ? "bg-gray-300 shadow-none" : "bg-blue-500 shadow-lg"}
				`}
			>
				<Text
					className={`text-lg font-bold ${isConfirmDisabled ? "text-gray-500" : "text-white"}`}
				>
					Book a Visit
				</Text>
				<Ionicons
					name="arrow-forward"
					size={20}
					color={isConfirmDisabled ? "#A0A0A0" : "white"}
					className="ml-2"
				/>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default BookingModule;

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
});
