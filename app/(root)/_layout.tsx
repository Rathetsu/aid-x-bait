import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getHeaderTitle = (name: string) => {
	switch (name) {
		case "aidxbait-store":
			return "AidxBait Store";
		case "exercise-programs":
			return "Exercise Programs";
		case "home-visits":
			return "Home Visits";
		case "online-consultations":
			return "Online Consultations";
		default:
			return name;
	}
};

const Header = ({ title }: { title: string }) => {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-row items-center justify-between px-4 pt-3 bg-white border-b border-gray-200 h-auto">
			{/* Back Button */}
			<TouchableOpacity onPress={() => router.back()} className="p-2">
				<Ionicons name="arrow-back" size={24} color="black" />
			</TouchableOpacity>
			{/* Title */}
			<Text className="text-lg font-bold text-black flex-1 text-center">
				{title}
			</Text>
			{/* Cart and Search Icons */}
			<View className="flex-row space-x-4">
				<TouchableOpacity className="p-2">
					<Ionicons name="cart" size={24} color="black" />
				</TouchableOpacity>
				<TouchableOpacity className="p-2">
					<Ionicons name="search" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const Layout = () => {
	return (
		<Stack
			screenOptions={{
				header: ({ route }) => <Header title={getHeaderTitle(route.name)} />,
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="aidxbait-store" />
			<Stack.Screen name="exercise-programs" />
			<Stack.Screen name="home-visits" />
			<Stack.Screen name="online-consultations" />
		</Stack>
	);
};

export default Layout;
