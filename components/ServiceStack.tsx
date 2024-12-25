import { router } from "expo-router";
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";

import { images, icons } from "@/constants";
import { Service } from "@/types/type";

const ServiceStack = () => {
	const services: Service[] = [
		{
			name: "Home Visit",
			icon: icons.homeVisit,
			desc: "Book an appointment",
			bg: images.texturedCardBlue,
			path: "/(root)/home-visits",
		},
		{
			name: "Online Consultation",
			icon: icons.onlineConsultation,
			desc: "Get Consultation Online",
			bg: images.texturedCardGreen,
			path: "/(root)/online-consultations",
		},
		{
			name: "Our Store",
			icon: icons.medicalStore,
			desc: "Order Medical Supplies",
			bg: images.texturedCardGreen,
			path: "/(root)/aidxbait-store",
		},
		{
			name: "Exercise Programs",
			icon: icons.exerciseProgram,
			desc: "Book an appointment",
			bg: images.texturedCardBlue,
			path: "/(root)/exercise-programs",
		},
	];

	return (
		<View className="mt-8 px-4">
			<Text className="text-lg font-JakartaBold mb-4">Our Services</Text>
			<View className="flex-row flex-wrap -mx-2">
				{services.map((service, index) => (
					<TouchableOpacity
						key={index}
						className="w-1/2 px-2 mb-4"
						activeOpacity={0.8}
						onPress={() => router.push(service.path)}
					>
						<View className="rounded-lg overflow-hidden shadow-md relative h-32">
							<ImageBackground
								source={service.bg}
								className="h-full w-full"
								style={StyleSheet.absoluteFill}
								resizeMode="cover"
							>
								<View className="absolute inset-0 p-4 flex justify-between">
									<Image
										source={service.icon}
										className="h-8 w-8"
										resizeMode="contain"
									/>
									<View>
										<Text className="font-JakartaSemiBold text-white text-base">
											{service.name}
										</Text>
										<Text className="text-white text-sm">{service.desc}</Text>
									</View>
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
