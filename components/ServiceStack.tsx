import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { images } from "@/constants";

const ServiceStack = () => {
	const services = [
		{
			name: "Home Visit",
			desc: "Book an appointment",
			background: images.texturedCardBlue,
		},
		{
			name: "Video Consultation",
			desc: "Get Consultation Online",
			background: images.texturedCardGreen,
		},
		{
			name: "Medical Store",
			desc: "Order Medicines",
			background: images.texturedCardBlue,
		},
		{
			name: "Exercise Programs",
			desc: "Book an appointment",
			background: images.texturedCardGreen,
		},
	];

	return (
		<View className="mt-8 px-4">
			<Text className="text-lg font-bold mb-4">Our Services</Text>
			<View className="flex-row flex-wrap -mx-2">
				{services.map((service, index) => (
					<TouchableOpacity
						key={index}
						className="w-1/2 px-2 mb-4"
						activeOpacity={0.8}
					>
						<View className="rounded-lg overflow-hidden shadow-lg relative h-36">
							{/* Background Image */}
							<Image
								source={service.background}
								style={StyleSheet.absoluteFillObject}
								resizeMode="cover"
							/>
							{/* Text Overlay */}
							<View className="absolute inset-0 p-4 justify-end bg-black/20">
								<Text className="font-bold text-white text-base">
									{service.name}
								</Text>
								<Text className="text-white text-sm mt-1">{service.desc}</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default ServiceStack;
