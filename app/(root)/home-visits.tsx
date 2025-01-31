import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BookingModule from "@/components/BookingModule";

const HomeVisits = () => {
	// bottom sheet ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// bottom sheet callbacks
	const presentBottomSheet = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<GestureHandlerRootView className="flex-1">
			<BottomSheetModalProvider>
				<BookingModule onPressBookVisit={presentBottomSheet} />
				<BottomSheetModal
					ref={bottomSheetModalRef}
					snapPoints={["40%", "85%"]}
					animateOnMount={true}
					keyboardBlurBehavior="restore"
					backgroundStyle={{ backgroundColor: "#dcdee0", borderRadius: 10 }}
					handleIndicatorStyle={{ backgroundColor: "#808080", width: 50 }}
					onChange={handleSheetChanges}
				>
					<BottomSheetView className="flex-1 p-6 bg-white rounded-t-lg shadow-lg h-96">
						<Text className="text-2xl font-JakartaSemiBold text-gray-900 text-center mt-6">
							Booking Confirmed!
						</Text>
						<Text className="text-gray-500 text-center mt-10 text-lg">
							Your home visit has been successfully scheduled.
						</Text>
						<TouchableOpacity
							className="bg-blue-600 py-3 rounded-lg mt-14 shadow-md active:scale-95 transition"
							onPress={() => {
								bottomSheetModalRef.current?.close();
								router.replace("/(root)/(tabs)/home");
							}}
						>
							<Text className="text-white text-center text-lg font-JakartaMedium">
								Back to Home
							</Text>
						</TouchableOpacity>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default HomeVisits;
