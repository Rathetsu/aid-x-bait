import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Onboarding = () => {
	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const isLastSlide = activeIndex === onboarding.length - 1;

	return (
		<SafeAreaView className="flex h-full bg-white">
			{/* Swiper */}
			<Swiper
				ref={swiperRef}
				loop={false}
				dot={
					<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
				}
				activeDot={
					<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
				}
				onIndexChanged={(index) => setActiveIndex(index)}
			>
				{onboarding.map((item) => (
					<View
						key={item.id}
						className="flex items-center justify-start relative"
					>
						{/* Arch design */}
						<View className="w-full h-[400px] bg-[#F0F4FA] rounded-b-[100px] overflow-hidden relative">
							{/* Image */}
							<Image
								source={item.image}
								className="w-full h-full"
								resizeMode="contain"
							/>

							{/* Buttons on top of the image */}
							<View className="absolute top-5 left-5 flex flex-row items-center">
								<TouchableOpacity className="flex flex-row items-center">
									<Text className="text-black text-md font-JakartaBold">
										AR
									</Text>
									<Ionicons name="chevron-down" size={16} color="black" />
								</TouchableOpacity>
							</View>
							<View className="absolute top-5 right-5">
								<TouchableOpacity
									onPress={() => {
										router.replace("/(auth)/sign-up");
									}}
									className="rounded-full bg-gray-200 px-4 py-2"
								>
									<Text className="text-black text-sm font-JakartaBold">
										Skip
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* Text Content */}
						<View className="mt-10 px-5">
							<Text className="text-black text-3xl font-bold text-center">
								{item.title}
							</Text>
							<Text className="text-md font-JakartaSemiBold text-center text-[#858585] mt-3">
								{item.description}
							</Text>
						</View>
					</View>
				))}
			</Swiper>

			{/* Bottom button */}
			<CustomButton
				title={isLastSlide ? "Get Started" : "Continue"}
				onPress={() =>
					isLastSlide
						? router.replace("/(auth)/sign-up")
						: swiperRef.current?.scrollBy(1)
				}
				className="mt-10 mb-5 w-10/12 self-center shadow-md rounded-none"
			/>
		</SafeAreaView>
	);
};

export default Onboarding;
