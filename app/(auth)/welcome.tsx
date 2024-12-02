import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SetStateAction, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Onboarding = () => {
	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedLanguage, setSelectedLanguage] = useState("English");

	const isLastSlide = activeIndex === onboarding.length - 1;

	const handleLanguageChange = (index: any, value: SetStateAction<string>) => {
		setSelectedLanguage(value);
	};

	return (
		<SafeAreaView className="flex h-full bg-white">
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
						<View className="w-full h-[400px] bg-[#F0F4FA] rounded-b-[100px] overflow-hidden relative">
							<Image
								source={item.image}
								className="w-full h-full"
								resizeMode="contain"
							/>

							<View className="absolute top-5 left-5 flex flex-row items-center">
								<ModalDropdown
									options={["English", "العربية"]}
									defaultValue={
										selectedLanguage === "English" ? "العربية" : "English"
									}
									onSelect={handleLanguageChange}
									dropdownStyle={{
										backgroundColor: "#F0F4FA",
										borderRadius: 12,
										elevation: 20,
										paddingVertical: 10,
										paddingHorizontal: 15,
										width: 130,
										height: 80,
									}}
									dropdownTextStyle={{
										fontSize: 14,
										fontWeight: "500",
										color: "#1A202C",
										backgroundColor: "transparent",
										paddingVertical: 8,
										paddingHorizontal: 10,
									}}
									textStyle={{
										fontSize: 14,
										fontWeight: "600",
										color: "#1A202C",
										textAlign: "center",
										paddingVertical: 5,
										paddingHorizontal: 10,
									}}
									renderRightComponent={() => (
										<Ionicons name="chevron-down" size={18} color="#4A5568" />
									)}
									renderRow={(option, index, isSelected) => (
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
												paddingVertical: 8,
												paddingHorizontal: 10,
												backgroundColor: "transparent",
											}}
										>
											<Text
												style={{
													fontSize: 14,
													fontWeight: "500",
													color: "#1A202C",
													backgroundColor: "transparent",
													paddingRight: 8,
												}}
											>
												{option}
											</Text>
											{selectedLanguage === option && (
												<Ionicons name="checkmark" size={16} color="#38A169" />
											)}
										</View>
									)}
								/>
							</View>
							<View className="absolute top-5 right-5">
								<TouchableOpacity
									onPress={() => {
										router.replace("/(auth)/sign-up");
									}}
									className="rounded-full bg-gray-100 shadow-md px-4 py-2"
								>
									<Text className="text-black text-sm font-JakartaBold">
										Skip
									</Text>
								</TouchableOpacity>
							</View>
						</View>

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

			<CustomButton
				title={isLastSlide ? "Get Started" : "Continue"}
				onPress={() =>
					isLastSlide
						? router.replace("/(auth)/sign-up")
						: swiperRef.current?.scrollBy(1)
				}
				className="mt-10 mb-5 self-center shadow-md w-10/12"
			/>
		</SafeAreaView>
	);
};

export default Onboarding;
