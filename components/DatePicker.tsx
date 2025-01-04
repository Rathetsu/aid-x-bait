import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Modal,
	Button,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { DatePickerDate } from "@/types/type";

const DatePicker = (
	selectedDate: string | null,
	setSelectedDate: (date: string | null) => void
) => {
	const [dates, setDates] = useState<DatePickerDate[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [manualDate, setManualDate] = useState<Date | null>(null);

	// Next 15 days starting from tomorrow
	const generateDates = (): DatePickerDate[] => {
		const today = new Date();
		const days = [];
		const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		for (let i = 1; i <= 15; i++) {
			const nextDate = new Date(today);
			nextDate.setDate(today.getDate() + i);

			const dayName = dayNames[nextDate.getDay()];
			const date = nextDate.getDate().toString().padStart(2, "0");

			days.push({ day: dayName, date });
		}

		return days;
	};

	useEffect(() => {
		setDates(generateDates());
	}, []);

	const handleDateChange = (date: Date) => {
		if (date) {
			setManualDate(date);
			setSelectedDate(
				`${date.getFullYear()}-${(date.getMonth() + 1)
					.toString()
					.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
			);
		}
		setIsModalVisible(false);
	};

	return (
		<View className="mb-6">
			<View className="flex-row justify-between">
				<Text className="text-lg font-JakartaBold text-black">Select Date</Text>
				<TouchableOpacity
					onPress={() => setIsModalVisible(true)}
					className="self-end"
				>
					<Text className="text-orange-500 font-JakartaBold">Set Manually</Text>
				</TouchableOpacity>
			</View>

			{/* Horizontal Days Scroll View */}
			<ScrollView horizontal className="mt-2">
				{dates.map((date) => (
					<TouchableOpacity
						key={date.date}
						className={`px-3 py-[10px] mx-2 my-4 rounded-lg ${
							selectedDate === date.date
								? "bg-primary-400 text-white"
								: "bg-gray-200"
						}`}
						onPress={() => setSelectedDate(date.date)}
					>
						<Text
							className={`text-sm text-center ${
								selectedDate === date.date ? "text-white" : "text-gray-600"
							}`}
						>
							{date.day}
							{`\n`}
							{date.date}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Date Picker Modal */}
			<Modal
				animationType="fade"
				// transparent
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View className="flex-1 justify-center items-center">
					<View className="m-5 bg-white rounded-2xl p-9 items-center shadow-lg shadow-black/25">
						<Text className="text-lg font-JakartaBold mb-4">Pick a Date</Text>
						<CalendarPicker
							selectedStartDate={
								manualDate ||
								new Date(new Date().setDate(new Date().getDate() + 1))
							}
							nextTitleStyle={{ color: "#FF5722" }}
							previousTitleStyle={{ color: "#FF5722" }}
							minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
							onDateChange={handleDateChange}
							showDayStragglers
						/>
						<Button
							title="Close"
							onPress={() => setIsModalVisible(false)}
							color="#FF5722"
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default DatePicker;
