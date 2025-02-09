import { useAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	ScrollView,
	Text,
	View,
} from "react-native";

import { getUser } from "@/api/user";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const SignIn = () => {
	const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn();
	const { user, isLoaded: isUserLoaded } = useUser();
	const { userId, getToken } = useAuth();
	const dispatch = useAppDispatch();

	const [form, setForm] = useState({
		phone: "",
		password: "",
	});

	const [signInComplete, setSignInComplete] = useState(false);
	const [loading, setLoading] = useState(false);

	const fetchUser = useCallback(async () => {
		if (!userId) {
			console.log("User ID not found!");
			return;
		}

		try {
			const clerkToken = await getToken();
			const res = await getUser(userId, clerkToken!);
			const userData = {
				id: parseInt(res.id!),
				patientId: parseInt(res.details.id!),
				firstName: res.first_name!,
				lastName: res.last_name!,
				email: res.email!,
				imageUrl: res.image_url ?? "",
				phone: res.phone_number!,
			};
			dispatch(setUser(userData));
			setSignInComplete(true);
		} catch (error) {
			console.error("Error fetching user:", error);
		}
	}, [userId, getToken, dispatch]);

	useEffect(() => {
		if (userId) {
			fetchUser();
		}
	}, [userId, fetchUser]);

	const onSignInPress = useCallback(async () => {
		if (!isSignInLoaded) return;

		setLoading(true);

		try {
			const signInAttempt = await signIn.create({
				identifier: "+12015550100", // for testing
				password: "test", // for testing
				// identifier: `+2${form.phone}`,
				// password: form.password,
			});

			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				setLoading(false);
				setSignInComplete(true);
			} else {
				console.log(JSON.stringify(signInAttempt, null, 2));
				setLoading(false);
				Alert.alert("Error", "Log in failed. Please try again.");
			}
		} catch (err: any) {
			console.log(JSON.stringify(err, null, 2));
			setLoading(false);
			Alert.alert("Error", err.errors[0].longMessage);
		}
	}, [isSignInLoaded, signIn, form.phone, form.password, setActive]);

	useEffect(() => {
		if (signInComplete && isUserLoaded && user) {
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
						loading={loading}
						className="mt-6"
					>
						{loading && <ActivityIndicator size="small" color="#fff" />}
					</CustomButton>

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
