import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditAddress() {
	const { id } = useLocalSearchParams();

	return (
		<SafeAreaView className="fles-1">
			<Text>Edit Address ID: {id}</Text>
		</SafeAreaView>
	);
}
