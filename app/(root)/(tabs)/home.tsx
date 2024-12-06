import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeBanner from "@/components/HomeBanner";

const Home = () => {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="px-4">
				{/* Header */}
				<View className="flex-row justify-between items-center mt-4">
					<View>
						<Text className="text-lg font-bold">Hi, Yosra Mohamed 👋</Text>
						<Text className="text-sm text-gray-500">How is your health?</Text>
					</View>
					<TouchableOpacity className="relative">
						<Image
							source={{
								uri: "https://randomuser.me/api/portraits/women/44.jpg",
							}}
							className="h-10 w-10 rounded-full"
						/>
						<View className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white" />
					</TouchableOpacity>
				</View>

				{/* Banner */}
				<HomeBanner />

				{/* Services */}
				<View className="mt-8">
					<Text className="text-lg font-bold mb-4">Our Services</Text>
					<View className="grid grid-cols-2 gap-4">
						{[
							{ name: "Home Visit", desc: "Book an appointment" },
							{ name: "Video Consultation", desc: "Get Consultation Online" },
							{ name: "Medical Store", desc: "Order Medicines" },
							{ name: "Exercise Programs", desc: "Book an appointment" },
						].map((service, index) => (
							<TouchableOpacity
								key={index}
								className="bg-blue-50 p-4 rounded-lg"
							>
								<Text className="font-semibold text-blue-800">
									{service.name}
								</Text>
								<Text className="text-sm text-blue-600">{service.desc}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Top Doctors */}
				{/* <View className="mt-8">
					<View className="flex-row justify-between items-center">
						<Text className="text-lg font-bold">Top Doctors</Text>
						<TouchableOpacity>
							<Text className="text-blue-600">See More</Text>
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="mt-4"
					>
						{[
							{
								name: "Dr. Ahmed Azzam",
								role: "Neurologist | Vcare Clinic",
								rating: "5.0 (332 reviews)",
								image: "https://via.placeholder.com/100x100.png?text=Doctor",
							},
						].map((doctor, index) => (
							<TouchableOpacity
								key={index}
								className="bg-white shadow-md rounded-lg p-4 mr-4 w-64"
							>
								<View className="flex-row items-center">
									<Image
										source={{ uri: doctor.image }}
										className="h-16 w-16 rounded-full"
									/>
									<View className="ml-4">
										<Text className="font-semibold text-gray-800">
											{doctor.name}
										</Text>
										<Text className="text-sm text-gray-600">{doctor.role}</Text>
										<Text className="text-sm text-yellow-500">
											{doctor.rating}
										</Text>
									</View>
								</View>
								<TouchableOpacity className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
									<Text className="text-white font-medium">Book Now</Text>
								</TouchableOpacity>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View> */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
