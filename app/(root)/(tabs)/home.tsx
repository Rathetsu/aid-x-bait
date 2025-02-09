import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ScrollableBanner from "@/components/ScrollableBanner";
import ServiceStack from "@/components/ServiceStack";
import { useAppSelector } from "@/store/hooks";

const Home = () => {
	const user = useAppSelector((state) => state.user.user);

	const { getToken } = useAuth();

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const token = await getToken();
				console.log("Token: ", token);
			} catch (error) {
				console.error("Error fetching token:", error);
			}
		};

		fetchToken();
	}, [getToken]);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="px-4">
				{/* Header */}
				<View className="flex-row justify-between items-center mt-4">
					<View>
						<Text className="text-lg font-JakartaBold">
							Hi, {user?.firstName} 👋
						</Text>
						<Text className="text-sm text-gray-500">How is your health?</Text>
					</View>
					<TouchableOpacity className="relative">
						<Image
							source={{
								uri: user?.imageUrl,
							}}
							className="h-10 w-10 rounded-full"
						/>
						<View className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white" />
					</TouchableOpacity>
				</View>
				{/* Banner */}
				<ScrollableBanner />
				{/* Services */}
				<ServiceStack />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
