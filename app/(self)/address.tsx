import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/Map";

const address = () => {
	return (
		<SafeAreaView>
			<Text className="text-2xl font-bold text-center mt-4">Address</Text>
			<Map />
		</SafeAreaView>
	);
};

export default address;
