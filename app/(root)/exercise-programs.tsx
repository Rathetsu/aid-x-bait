import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SkeletonModule from "@/components/SkeletonModule";

const ExercisePrograms = () => {
	return (
		<SafeAreaView className="flex-1">
			<Text>ExercisePrograms</Text>
			<Button
				onPress={() => router.replace("/(programs)/program-gallery")}
				title="Gallery"
			/>
			<SkeletonModule onNavigate={(boneName) => console.log(boneName)} />
		</SafeAreaView>
	);
};

export default ExercisePrograms;
