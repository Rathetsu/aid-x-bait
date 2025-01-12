import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/Map";

const address = () => {
	return (
		<SafeAreaView className="flex-1">
			<Map />
		</SafeAreaView>
	);
};

export default address;
