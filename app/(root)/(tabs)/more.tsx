import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignOutButton from "@/components/SignOutButton";
import { useAppSelector } from "@/store/hooks";

const More = () => {
	const user = useAppSelector((state) => state.user.user);

	return (
		<SafeAreaView>
			<Text>More</Text>
			<SignOutButton />
			{/* render user json */}
			<Text className="mt-10">{JSON.stringify(user)}</Text>
		</SafeAreaView>
	);
};

export default More;
