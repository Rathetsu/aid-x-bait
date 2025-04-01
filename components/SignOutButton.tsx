import { useClerk } from "@clerk/clerk-react";
import { router } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

const SignOutButton = () => {
	const { signOut } = useClerk();

	const handleSignOut = async () => {
		try {
			await signOut();
			// Redirect to your desired page
			router.replace("/(auth)/sign-in");
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<TouchableOpacity
			onPress={handleSignOut}
			className="flex items-center justify-cente bg-slate-800 py-3 px-6 rounded-lg my-10"
		>
			<Text className="text-white font-bold text-base">Sign Out</Text>
		</TouchableOpacity>
	);
};

export default SignOutButton;
