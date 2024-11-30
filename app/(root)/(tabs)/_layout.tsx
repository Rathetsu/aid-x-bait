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
	<View
		className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
	>
		<View
			className={`rounded-full w-12 h-12 justify-center items-center ${focused ? "bg-general-450" : ""}`}
		>
			<Image
				source={source}
				tintColor="white"
				resizeMode="contain"
				className="w-7 h-7"
			/>
		</View>
	</View>
);

const Layout = () => {
	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "white",
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "#333333",
					borderRadius: 50,
					paddingBottom: 0,
					overflow: "hidden",
					marginHorizontal: 20,
					marginBottom: 20,
					height: 80,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					position: "absolute",
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
