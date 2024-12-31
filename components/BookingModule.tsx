import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import DatePicker from "./DatePicker";

const BookingModule: React.FC = () => {
	const [selectedSpeciality, setSelectedSpeciality] = useState<string>("Ortho");
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("8-12AM");
	const [isDropdownInFocus, setIsDropdownInFocus] = useState<boolean>(false);
	const [specialist, setSpecialist] = useState<string>("Male");
	const [note, setNote] = useState<string>("");

	const specialities = ["Ortho", "General", "Neuro"];
	const timeSlots = ["8-12AM", "1-6PM", "7-11PM"];

	return (
		<ScrollView className="flex-1 bg-white p-4">
			{/* Address Location */}
			<View className="mb-6">
				<Text className="text-lg font-bold text-black">Address Location</Text>
				<View className="flex-row justify-between items-center mt-2">
					<Text className="text-gray-600 flex-1">
						El-Abour Bldgs 11 6th Floor.
					</Text>
					<TouchableOpacity>
						<Text className="text-blue-500">Change</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Select Date */}
			<DatePicker />

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
			<TouchableOpacity className="bg-primary-400 py-4 rounded-lg flex-row items-center justify-center">
				<Text className="text-white text-lg font-bold">Book a Visit</Text>
				<Ionicons
					name="arrow-forward"
					size={20}
					color="white"
					className="ml-2"
				/>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default BookingModule;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 16,
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
