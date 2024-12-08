import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
	increment,
	decrement,
	incrementByAmount,
} from "@/store/slices/counterSlice";

const AidxbaitStore = () => {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<SafeAreaView className="flex-1 justify-center items-center">
			<Text className="text-lg mb-16">Count: {count}</Text>
			<Button title="Increment" onPress={() => dispatch(increment())} />
			<Button title="Decrement" onPress={() => dispatch(decrement())} />
			<Button
				title="Increment by 5"
				onPress={() => dispatch(incrementByAmount(5))}
			/>
		</SafeAreaView>
	);
};

export default AidxbaitStore;
