import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Modal,
	Button,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { DatePickerDate, DatePickerProps } from "@/types/type";

const DatePicker = ({ selectedDate, setSelectedDate }: DatePickerProps) => {
	const [dates, setDates] = useState<DatePickerDate[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [manualDate, setManualDate] = useState<Date | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	// Generate dates dynamically based on a starting date
	const generateDates = (
		startDate: Date,
		daysToGenerate: number
	): DatePickerDate[] => {
		const days = [];
		const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		for (let i = 0; i < daysToGenerate; i++) {
			const nextDate = new Date(startDate);
			nextDate.setDate(startDate.getDate() + i);

			const dayName = dayNames[nextDate.getDay()];
			const date = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${nextDate.getDate().toString().padStart(2, "0")}`;

			days.push({ day: dayName, date });
		}

		return days;
	};

	useEffect(() => {
		const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
		const initialDates = generateDates(tomorrow, 15); // Generate next 15 days
		setDates(initialDates);
	}, []);

	// Ensure the selected date is in the horizontal scroll view range
	const ensureDateInRange = (date: string) => {
		const dateObj = new Date(date);
		const firstDate = new Date(dates[0].date);
		const lastDate = new Date(dates[dates.length - 1].date);

		// Ensure Date objects are converted to numbers (milliseconds since epoch) for arithmetic operations
		if (dateObj.getTime() < firstDate.getTime()) {
			// Prepend dates if the selected date is before the current range
			const daysToPrepend =
				Math.ceil(
					(firstDate.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24)
				) + 1;
			const newDates = generateDates(dateObj, daysToPrepend);
			setDates((prev) => [
				...newDates,
				...prev.filter((d) => !newDates.some((nd) => nd.date === d.date)),
			]);
		} else if (dateObj.getTime() > lastDate.getTime()) {
			// Append dates if the selected date is after the current range
			const daysToAdd =
				Math.ceil(
					(dateObj.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
				) + 1;
			const newDates = generateDates(lastDate, daysToAdd);
			setDates((prev) => [
				...prev,
				...newDates.filter((nd) => !prev.some((pd) => pd.date === nd.date)),
			]);
		}
	};

	// Automatically scroll to center the selected date
	const scrollToSelectedDate = (index: number) => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				x: index * 80 - (200 - 40), // Center the selected date (80px width per item, 200px view width)
				animated: true,
			});
		}
	};

	const handleDateChange = (date: Date) => {
		if (date) {
			const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

			setManualDate(date);
			setSelectedDate(formattedDate);

			// Ensure the date is in the scroll view and scroll to it
			ensureDateInRange(formattedDate);
			const index = dates.findIndex((d) => d.date === formattedDate);
			if (index !== -1) {
				scrollToSelectedDate(index);
			}
		}
		setIsModalVisible(false);
	};

	const handleHorizontalDateSelect = (date: string, index: number) => {
		setSelectedDate(date);

		// Update manualDate to sync with the calendar
		setManualDate(new Date(date));

		scrollToSelectedDate(index);
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
			<ScrollView
				ref={scrollViewRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				className="mt-2"
			>
				{dates.map((date, index) => (
					<TouchableOpacity
						key={date.date}
						className={`px-4 py-[8px] mx-2 my-4 rounded-lg ${
							selectedDate === date.date ? "bg-primary-400" : "bg-gray-200"
						}`}
						onPress={() => handleHorizontalDateSelect(date.date, index)}
					>
						<Text
							className={`text-sm text-center ${
								selectedDate === date.date ? "text-white" : "text-gray-600"
							}`}
						>
							{date.day}
							{`\n`}
							{date.date.split("-")[2]}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Date Picker Modal */}
			<Modal
				animationType="fade"
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View className="flex-1 justify-center items-center">
					<View className="m-5 bg-white rounded-2xl p-9 items-center shadow-lg shadow-black/25">
						<Text className="text-lg font-JakartaBold mb-4">Pick a Date</Text>
						<CalendarPicker
							selectedStartDate={
								manualDate ||
								new Date(new Date().setDate(new Date().getDate() + 1)) // Default to tomorrow if manualDate is null
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
