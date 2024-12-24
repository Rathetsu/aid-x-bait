import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import { icons } from "@/constants";

const injuries = [
	{ id: 1, name: "Knee", icon: icons.knee },
	{ id: 2, name: "Back", icon: icons.spine },
	{ id: 3, name: "Elbow", icon: icons.elbow },
	{ id: 4, name: "Shoulder", icon: icons.shoulder },
	{ id: 5, name: "Leg", icon: icons.leg },
	{ id: 6, name: "Hip", icon: icons.hip },
];

const InjurySelector = () => {
	return (
		<View className="px-4 py-6 mt-4 bg-white">
			{/* Header */}
			<View className="flex-row justify-between items-center mb-4">
				<View className="flex-row items-center">
					<View className="w-1 h-7 bg-orange-500 mr-2" />
					<Text className="text-lg font-semibold text-gray-800">
						Browse by injury
					</Text>
				</View>
				<TouchableOpacity>
					<Text className="text-orange-500 text-sm font-medium">See More</Text>
				</TouchableOpacity>
			</View>

			{/* Scrollable List */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 4 }}
			>
				{injuries.map((injury) => (
					<TouchableOpacity
						key={injury.id}
						className="flex items-center justify-center mr-4"
					>
						<View className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
							<Image
								source={injury.icon}
								className="w-10 h-10"
								resizeMode="contain"
							/>
						</View>
						<Text className="text-sm font-medium text-gray-600 mt-2">
							{injury.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default InjurySelector;
