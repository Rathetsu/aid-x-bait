import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/Map";

const address = () => {
	return (
		<SafeAreaView>
			<Text>Address</Text>
			<Map />
		</SafeAreaView>
	);
};

export default address;
