import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

import { images, icons } from "@/constants";

const ServiceStack = () => {
	const services = [
		{
			name: "Home Visit",
			icon: icons.homeVisit,
			desc: "Book an appointment",
			background: images.texturedCardBlue,
		},
		{
			name: "Video Consultation",
			icon: icons.videoConsultation,
			desc: "Get Consultation Online",
			background: images.texturedCardGreen,
		},
		{
			name: "Medical Store",
			icon: icons.medicalStore,
			desc: "Order Medicines",
			background: images.texturedCardBlue,
		},
		{
			name: "Exercise Programs",
			icon: icons.exerciseProgram,
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
						<View className="rounded-lg overflow-hidden shadow-md relative h-32">
							<ImageBackground
								source={service.background}
								className="h-full w-full"
								style={StyleSheet.absoluteFill}
								resizeMode="cover"
							>
								<View className="absolute inset-0 p-4 flex justify-end bg-black/10">
									<Text className="font-semibold text-white text-base">
										{service.name}
									</Text>
									<Text className="text-white text-sm">{service.desc}</Text>
								</View>
							</ImageBackground>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default ServiceStack;
