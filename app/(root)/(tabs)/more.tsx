import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignOutButton from "@/components/SignOutButton";

const More = () => {
	return (
		<SafeAreaView>
			<Text>More</Text>
			<SignOutButton />
		</SafeAreaView>
	);
};

export default More;
