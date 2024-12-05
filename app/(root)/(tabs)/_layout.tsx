import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
	focused,
	source,
}: {
	focused: boolean;
	source: ImageSourcePropType;
}) => (
	<View className="flex justify-center items-center">
		<Image
			source={source}
			tintColor={focused ? "#49869F" : "#888"}
			resizeMode="contain"
			className="w-8 h-8"
		/>
	</View>
);

const Layout = () => {
	return (
		<Tabs
			initialRouteName="home"
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
						<TabIcon focused={focused} source={icons.profile} />
					),
				}}
			/>
			<Tabs.Screen
				name="appointments"
				options={{
					title: "Appointments",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.profile} />
					),
				}}
			/>
			<Tabs.Screen
				name="more"
				options={{
					title: "More",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={icons.profile} />
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;
