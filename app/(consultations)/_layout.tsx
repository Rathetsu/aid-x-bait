import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "@/store";

const AppointmentSearchHeader = () => {
	const router = useRouter();
	return (
		<SafeAreaView className="flex-row items-center justify-between px-4 pt-2 bg-white border-b border-gray-200 h-auto">
			{/* Back Button */}
			<TouchableOpacity onPress={() => router.back()} className="pr-2">
				<Ionicons name="chevron-back" size={20} color="#636363" />
			</TouchableOpacity>
			{/* Search text input */}
			<View className="flex-1">
				<Text className="text-lg font-JakartaBold text-black flex-1 text-center capitalize">
					Search
				</Text>
			</View>
		</SafeAreaView>
	);
};

const getHeader = (name: string) => {
	switch (name) {
		case "appointment-search":
			return <AppointmentSearchHeader />;
		default:
			return null;
	}
};

const Layout = () => {
	return (
		<Provider store={store}>
			<Stack
				screenOptions={{
					header: ({ route }) => getHeader(route.name),
				}}
			>
				<Stack.Screen
					name="appointment-search"
					options={{ headerShown: false }}
				/>
			</Stack>
		</Provider>
	);
};

export default Layout;
