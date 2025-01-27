// import { useRouter } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { AppointmentCardProps, TabsProps } from "@/types/type";

const AppointmentCard: React.FC<AppointmentCardProps> = ({
	status,
	doctorName,
	specialty,
	date,
	time,
	buttonLabel,
	onPress,
}) => {
	return (
		<View className="bg-white shadow-md rounded-2xl p-4 mb-4">
			<View className="flex-row items-center justify-between">
				<View>
					<Text className="text-lg font-bold text-gray-800">{doctorName}</Text>
					<Text className="text-sm text-gray-500">{specialty}</Text>
				</View>
				<Text className="text-sm text-blue-500 font-semibold">{status}</Text>
			</View>
			<View className="flex-row items-center justify-between mt-4">
				<View>
					<Text className="text-gray-600">{date}</Text>
					<Text className="text-gray-600">{time}</Text>
				</View>
				<TouchableOpacity
					onPress={onPress}
					className="bg-blue-500 px-4 py-2 rounded-full"
				>
					<Text className="text-white font-medium">{buttonLabel}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const Tabs: React.FC<TabsProps> = ({ activeTab, onChangeTab }) => {
	const tabs = ["Upcoming", "Completed", "Canceled"];
	return (
		<View className="flex-row justify-around border-b border-gray-200 mb-4">
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab}
					onPress={() => onChangeTab(tab)}
					className={`pb-2 ${
						activeTab === tab ? "border-b-2 border-blue-500" : ""
					}`}
				>
					<Text
						className={`text-sm font-medium ${
							activeTab === tab ? "text-blue-500" : "text-gray-500"
						}`}
					>
						{tab}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const AppointmentScreen = () => {
	// const router = useRouter();
	const [activeTab, setActiveTab] = useState("Upcoming");

	const appointments = [
		{
			id: 1,
			doctorName: "Dr. Ahmed Azzam",
			specialty: "Orthopedic",
			date: "Sunday, 12 June",
			time: "11:00 AM - 12:00 PM",
			status: activeTab === "Upcoming" ? "Start in 5 min" : "",
			buttonLabel: activeTab === "Upcoming" ? "Join the Call" : "Book Again",
		},
		{
			id: 2,
			doctorName: "Dr. Ahmed Azzam",
			specialty: "Orthopedic",
			date: "Sunday, 12 June",
			time: "11:00 AM - 12:00 PM",
			status: activeTab === "Upcoming" ? "" : "",
			buttonLabel: activeTab === "Upcoming" ? "Join the Call" : "Book Again",
		},
	];

	return (
		<View className="flex-1 bg-gray-100 pt-6">
			<Tabs activeTab={activeTab} onChangeTab={setActiveTab} />
			<ScrollView className="px-4">
				{appointments.map((appointment) => (
					<AppointmentCard
						key={appointment.id}
						doctorName={appointment.doctorName}
						specialty={appointment.specialty}
						date={appointment.date}
						time={appointment.time}
						status={appointment.status}
						buttonLabel={appointment.buttonLabel}
						onPress={() => router.replace("/(consultations)/video-call")}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default AppointmentScreen;
