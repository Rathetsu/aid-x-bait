import { useSignIn, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const SignIn = () => {
	const { signIn, setActive, isLoaded } = useSignIn();
	const { user, isLoaded: isUserLoaded } = useUser();
	const dispatch = useAppDispatch();

	const [form, setForm] = useState({
		phone: "",
		password: "",
	});

	const [signInComplete, setSignInComplete] = useState(false);

	const onSignInPress = useCallback(async () => {
		if (!isLoaded) return;

		try {
			const signInAttempt = await signIn.create({
				identifier: `+2${form.phone}`,
				password: form.password,
			});

			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				setSignInComplete(true);
			} else {
				console.log(JSON.stringify(signInAttempt, null, 2));
				Alert.alert("Error", "Log in failed. Please try again.");
			}
		} catch (err: any) {
			console.log(JSON.stringify(err, null, 2));
			Alert.alert("Error", err.errors[0].longMessage);
		}
	}, [isLoaded, signIn, form.phone, form.password, setActive]);

	useEffect(() => {
		if (signInComplete && isUserLoaded && user) {
			const userData = {
				firstName: user.firstName ?? "",
				lastName: user.lastName ?? "",
				email: user.emailAddresses[0].emailAddress ?? "",
				imageUrl: user.imageUrl ?? "",
				phone: user.primaryPhoneNumber?.phoneNumber!,
			};

			dispatch(setUser(userData));
			router.replace("/(root)/(tabs)/home");
		}
	}, [signInComplete, isUserLoaded, user, dispatch]);

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="flex-1 bg-white">
				<View className="relative w-full h-[250px]">
					<Image
						source={images.texturedBackground}
						className="z-0 w-full h-[250px]"
					/>
					<Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
						Welcome 👋
					</Text>
				</View>

				<View className="p-5">
					<InputField
						label="Phone"
						placeholder="Enter your phone numebr"
						icon={icons.phone}
						textContentType="telephoneNumber"
						lowercase={true}
						value={form.phone}
						onChangeText={(value) => setForm({ ...form, phone: value })}
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
						title="Sign In"
						onPress={onSignInPress}
						className="mt-6"
					/>

					<OAuth />

					<Link
						href="/sign-up"
						className="text-lg text-center text-general-200 mt-10"
					>
						Don't have an account?{" "}
						<Text className="text-primary-500">Sign Up</Text>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignIn;
