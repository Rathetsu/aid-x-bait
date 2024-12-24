import { useState } from "react";
import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from "react-native";

const ScrollableBanner = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const banners = [
		{
			title: "Medical Checks!",
			description:
				"Check your health condition regularly to minimize the incidence of disease in the future.",
			buttonText: "Check Now",
			image: "https://via.placeholder.com/100x100.png?text=Doctor",
		},
		{
			title: "Consult Specialists",
			description: "Find the best specialists online and get expert advice.",
			buttonText: "Consult Now",
			image: "https://via.placeholder.com/100x100.png?text=Specialist",
		},
		{
			title: "Stay Healthy",
			description: "Get tips and resources to maintain a healthy lifestyle.",
			buttonText: "Learn More",
			image: "https://via.placeholder.com/100x100.png?text=Healthy",
		},
	];

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffsetX / 300); // Assuming each item is 300px wide
		setCurrentIndex(index);
	};

	return (
		<View className="mt-6">
			<FlatList
				data={banners}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				onScroll={handleScroll}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View className="w-[91vw] bg-blue-100 p-4 rounded-lg mr-4 h-36">
						<Text className="text-lg font-semibold text-blue-800">
							{item.title}
						</Text>
						<Text className="text-sm text-blue-600">{item.description}</Text>
						<TouchableOpacity className="w-[30vw] items-center mt-3 bg-blue-600 px-4 py-2 rounded-lg">
							<Text className="text-white font-medium">{item.buttonText}</Text>
						</TouchableOpacity>
						<Image
							source={{ uri: item.image }}
							className="h-20 w-20 self-end"
						/>
					</View>
				)}
			/>
			{/* Dots Indicator */}
			<View className="flex-row justify-center mt-4">
				{banners.map((_, index) => (
					<View
						key={index}
						className={`h-2 w-2 mx-1 rounded-full ${
							index === currentIndex ? "bg-blue-600" : "bg-gray-300"
						}`}
					/>
				))}
			</View>
		</View>
	);
};

export default ScrollableBanner;
