import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [form, setForm] = useState({
		name: "",
		phone: "",
		email: "",
		password: "",
	});

	const [verification, setVerification] = useState({
		state: "default",
		error: "",
		code: "",
	});

	const onSignUpPress = async () => {
		if (!isLoaded) return;
		try {
			await signUp.create({
				// phoneNumber: "+12015550100", // testing phone number - code: 424242
				phoneNumber: `+2${form.phone}`, // +2 for Egypt
				emailAddress: form.email.toLowerCase(),
				password: form.password,
			});
			await signUp.preparePhoneNumberVerification({
				strategy: "phone_code",
			});
			setVerification({
				...verification,
				state: "pending",
			});
		} catch (err: any) {
			console.log(JSON.stringify(err, null, 2));
			Alert.alert("Error", err.errors[0].longMessage);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) return;
		try {
			const completeSignUp = await signUp.attemptPhoneNumberVerification({
				code: verification.code,
			});
			if (completeSignUp.status === "complete") {
				// TODO: Add user to database
				// await fetchAPI("/(api)/user", {
				// 	method: "POST",
				// 	body: JSON.stringify({
				// 		name: form.name,
				// 		email: form.email.toLowerCase(),
				// 		clerkId: completeSignUp.createdUserId,
				// 		password: form.password,
				// 	}),
				// });
				await setActive({ session: completeSignUp.createdSessionId });
				setVerification({
					...verification,
					state: "success",
				});
				setShowSuccessModal(true);
			} else {
				setVerification({
					...verification,
					error: "Verification failed. Please try again.",
					state: "failed",
				});
			}
		} catch (err: any) {
			setVerification({
				...verification,
				error: err.errors[0].longMessage,
				state: "failed",
			});
		}
	};

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="flex-1 bg-white">
				<View className="relative w-full h-[250px]">
					<Image source={images.signupHero} className="z-0 w-full h-[250px]" />
					<View className="absolute inset-0 bg-black/50 backdrop-blur-lg">
						<Text className="text-3xl text-white font-JakartaSemiBold absolute bottom-5 left-5 shadow-slate-900">
							Create Your Account
						</Text>
					</View>
				</View>
				<View className="p-5">
					<InputField
						label="Name"
						placeholder="Enter name"
						icon={icons.person}
						value={form.name}
						onChangeText={(value) => setForm({ ...form, name: value })}
					/>
					<InputField
						label="Phone"
						placeholder="011 2345 6789"
						icon={icons.email}
						textContentType="telephoneNumber"
						keyboardType="phone-pad"
						value={form.phone}
						onChangeText={(value) => setForm({ ...form, phone: value })}
					/>
					<InputField
						label="Email"
						placeholder="Enter email"
						icon={icons.email}
						textContentType="emailAddress"
						value={form.email}
						lowercase={true}
						onChangeText={(value) => setForm({ ...form, email: value })}
					/>
					<InputField
						label="Password"
						placeholder="Enter password"
						icon={icons.lock}
						secureTextEntry={true}
						textContentType="password"
						value={form.password}
						onChangeText={(value) => setForm({ ...form, password: value })}
					/>
					<CustomButton
						title="Create an Account"
						onPress={onSignUpPress}
						className="mt-6"
					/>
					<OAuth />
					<Link
						href="/sign-in"
						className="text-lg text-center text-general-200 mt-10"
					>
						Already have an account?{" "}
						<Text className="text-primary-500">Login</Text>
					</Link>
				</View>
				<ReactNativeModal
					isVisible={
						verification.state === "pending" || verification.state === "failed"
					}
				>
					<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
						<Text className="font-JakartaExtraBold text-2xl mb-2">
							Verification
						</Text>
						<Text className="font-Jakarta mb-5">
							We've sent a verification code to +2{form.phone}.
						</Text>
						<InputField
							label={"Code"}
							icon={icons.lock}
							placeholder={"12345"}
							value={verification.code}
							keyboardType="numeric"
							onChangeText={(code) =>
								setVerification({ ...verification, code })
							}
						/>
						{verification.error && (
							<Text className="text-red-500 text-sm mt-1">
								{verification.error}
							</Text>
						)}
						<CustomButton
							title="Verify Phone number"
							onPress={onPressVerify}
							className="mt-5 bg-success-500"
						/>
					</View>
				</ReactNativeModal>
				<ReactNativeModal isVisible={showSuccessModal}>
					<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
						<Image
							source={images.check}
							className="w-[110px] h-[110px] mx-auto my-5"
						/>
						<Text className="text-3xl font-JakartaBold text-center">
							Verified
						</Text>
						<Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
							You have successfully verified your account.
						</Text>
						<CustomButton
							title="Continue"
							onPress={() => {
								setShowSuccessModal(false);
								router.push(`/(root)/(tabs)/home`);
							}}
							className="mt-5"
						/>
					</View>
				</ReactNativeModal>
			</View>
		</ScrollView>
	);
};
export default SignUp;
