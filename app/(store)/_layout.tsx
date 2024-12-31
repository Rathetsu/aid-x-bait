import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "@/store";

const CartHeader = () => {
	const router = useRouter();
	const title = "Cart";
	let numberOfItems = store.getState().cart.items.length;

	return (
		<SafeAreaView className="flex-row items-center justify-between px-4 pt-2 pb-[-20] bg-white border-b border-gray-200 h-auto">
			{/* Back Button */}
			<TouchableOpacity onPress={() => router.back()} className="pr-2">
				<Ionicons name="chevron-back" size={20} color="#636363" />
			</TouchableOpacity>
			{/* Title */}
			<Text className="text-lg font-JakartaBold text-black flex-1 text-center capitalize">
				{title}
			</Text>
			{/* Number of Items */}
			<View className="rounded-full bg-primary-400 px-3 py-1">
				<Text className="text-sm font-JakartaMedium text-black text-center">
					{numberOfItems} items
				</Text>
			</View>
		</SafeAreaView>
	);
};

const ProductSearchHeader = () => {
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
		case "cart":
			return <CartHeader />;
		case "product-search":
			return <ProductSearchHeader />;
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
				<Stack.Screen name="cart" />
				<Stack.Screen name="product-preview" options={{ headerShown: false }} />
				<Stack.Screen name="product-search" options={{ headerShown: false }} />
			</Stack>
		</Provider>
	);
};

export default Layout;
