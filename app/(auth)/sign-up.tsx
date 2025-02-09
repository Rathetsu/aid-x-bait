import { useAuth, useSignUp, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import { createUser } from "@/api/user";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { tokenCache } from "@/lib/auth";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const SignUp = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const { user, isLoaded: isUserLoaded } = useUser();
	const { getToken } = useAuth();

	const [signUpComplete, setSignUpComplete] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [patientId, setPatientId] = useState<string | null>(null);

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		password: "",
	});

	const [verification, setVerification] = useState({
		state: "default",
		error: "",
		code: "",
	});

	const dispatch = useAppDispatch();

	const onSignUpPress = async () => {
		if (!isLoaded) return;
		try {
			await signUp.create({
				phoneNumber: "+12015550100", // testing phone number - code: 424242
				// phoneNumber: `+2${form.phone}`, // +2 for Egypt
				firstName: form.firstName,
				lastName: form.lastName,
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
				// Activate the user session
				await setActive({ session: completeSignUp.createdSessionId });
				const token = await getToken();
				tokenCache.saveToken("__clerk_client_jwt", token!);

				// Add the user to the database
				const userData = {
					createDto: {
						first_name: form.firstName,
						last_name: form.lastName,
						email: form.email.toLowerCase(),
						clerk_id: completeSignUp.createdUserId!,
						image_url: user?.imageUrl ?? "",
						phone_number: `+2${form.phone}`,
					},
					user_type: "patient",
				};
				const res = await createUser(userData);
				setUserId(res.user_id);
				setPatientId(res.patient_id);

				setVerification({
					...verification,
					state: "success",
				});
				setSignUpComplete(true);
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

	useEffect(() => {
		if (signUpComplete && isUserLoaded && user) {
			const userData = {
				id: parseInt(userId!),
				patientId: parseInt(patientId!),
				firstName: user.firstName ?? "",
				lastName: user.lastName ?? "",
				email: user.emailAddresses[0].emailAddress ?? "",
				imageUrl: user.imageUrl ?? "",
				phone: user.primaryPhoneNumber?.phoneNumber!,
			};
			// Save the user data to the Redux store and the local storage
			dispatch(setUser(userData));
			router.replace("/(root)/(tabs)/home");
		}
	}, [signUpComplete, isUserLoaded, user, userId, patientId, dispatch]);

	return (
		<>
			<ScrollView className="flex-1 bg-white">
				<View className="flex-1 bg-white">
					<View className="relative w-full h-[250px]">
						<Image
							source={images.signupHero}
							className="z-0 w-full h-[250px]"
						/>
						<View className="absolute inset-0 bg-black/50 backdrop-blur-lg">
							<Text className="text-3xl text-white font-JakartaSemiBold absolute bottom-5 left-5 shadow-slate-900">
								Create Your Account
							</Text>
						</View>
					</View>
					<View className="p-5">
						<View className="flex-row">
							<View className="flex-1 mr-2">
								<InputField
									label="First Name"
									placeholder="Enter first name"
									icon={icons.person}
									value={form.firstName}
									onChangeText={(value) =>
										setForm({ ...form, firstName: value })
									}
								/>
							</View>
							<View className="flex-1 ml-2">
								<InputField
									label="Last Name"
									placeholder="Enter last name"
									icon={icons.person}
									value={form.lastName}
									onChangeText={(value) =>
										setForm({ ...form, lastName: value })
									}
								/>
							</View>
						</View>
						<InputField
							label="Phone"
							placeholder="011 2345 6789"
							icon={icons.phone}
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
				</View>
			</ScrollView>
			<ReactNativeModal
				isVisible={
					verification.state === "pending" || verification.state === "failed"
				}
				onModalHide={() => {
					if (verification.state === "success") {
						setTimeout(() => {
							setShowSuccessModal(true);
						}, 300);
					}
				}}
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
						onChangeText={(code) => setVerification({ ...verification, code })}
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
			<ReactNativeModal
				isVisible={showSuccessModal}
				backdropTransitionOutTiming={0}
			>
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
		</>
	);
};
export default SignUp;
