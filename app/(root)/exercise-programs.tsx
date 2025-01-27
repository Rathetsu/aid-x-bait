import InteractiveSkeleton from "@/components/Exercises/InteractiveSkeleton/InteractiveSkeleton";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ExercisePrograms = () => {
	return (
		<GestureHandlerRootView>
		<SafeAreaView>
			<InteractiveSkeleton />
		</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default ExercisePrograms;
