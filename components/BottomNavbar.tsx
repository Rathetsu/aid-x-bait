import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import {
	Image,
	ImageSourcePropType,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

const TabIcon = ({
	focused,
	source,
}: {
	focused: boolean;
	source: ImageSourcePropType;
}) => (
	<View className="flex justify-center items-center mb-4">
		<Image
			source={source}
			tintColor={focused ? "#49869F" : "#888"}
			resizeMode="contain"
			className="w-8 h-8"
		/>
	</View>
);

const BottomNavbar = ({ initialRouteName }: { initialRouteName: string }) => {
	return (
		<Tabs
			initialRouteName={initialRouteName}
			screenOptions={{
				tabBarActiveTintColor: "#8888",
				tabBarInactiveTintColor: "#888",
				tabBarShowLabel: true,
				tabBarStyle: {
					backgroundColor: "#ffffff",
					borderRadius: 10,
					height: 90,
					display: "flex",
					position: "absolute",
					paddingTop: 10,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 5 },
					shadowOpacity: 0.1,
					shadowRadius: 10,
					elevation: 5,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.home} />
					),
				}}
			/>
			<Tabs.Screen
				name="videos"
				options={{
					title: "Videos",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.videos} />
					),
				}}
			/>
			<Tabs.Screen
				name="appointments"
				options={{
					title: "Appointments",
					headerShown: true,
					header: () => (
						<SafeAreaView className="px-6 pt-2 pb-[-10] bg-white shadow-md flex-row items-center justify-between">
							<Text className="text-xl font-JakartaBold text-gray-800">
								My Appointments
							</Text>
							<TouchableOpacity className="p-2">
								<Ionicons
									name="search"
									size={24}
									color="black"
									onPress={() =>
										router.push("/(consultations)/appointment-search")
									}
								/>
							</TouchableOpacity>
						</SafeAreaView>
					),
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.appointments} />
					),
				}}
			/>
			<Tabs.Screen
				name="more"
				options={{
					title: "More",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.more} />
					),
				}}
			/>
		</Tabs>
	);
};

export default BottomNavbar;
