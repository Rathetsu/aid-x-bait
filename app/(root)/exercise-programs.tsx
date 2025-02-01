import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SkeletonModule from "@/components/SkeletonModule";

const ExercisePrograms = () => {
	return (
		<SafeAreaView className="flex-1">
			<Text>ExercisePrograms</Text>
			<SkeletonModule onNavigate={(boneName) => console.log(boneName)} />
		</SafeAreaView>
	);
};

export default ExercisePrograms;
