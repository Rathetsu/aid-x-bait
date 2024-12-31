import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { DatePickerDate } from "@/types/type";

const DatePicker = () => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [dates, setDates] = useState<DatePickerDate[]>([]);

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

	return (
		<View className="mb-6">
			<Text className="text-lg font-bold text-black">Select Date</Text>
			<ScrollView horizontal className="mt-2">
				{dates.map((date) => (
					<TouchableOpacity
						key={date.date}
						className={`px-4 py-2 mx-2 my-4 rounded-lg ${
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
		</View>
	);
};

export default DatePicker;
