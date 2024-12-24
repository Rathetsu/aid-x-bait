import { View } from "react-native";

import InjurySelector from "@/components/InjurySelector";
import ScrollableBanner from "@/components/ScrollableBanner";

const AidxbaitStore = () => {
	return (
		<View className="flex-1">
			<ScrollableBanner />
			<InjurySelector />
		</View>
	);
};

export default AidxbaitStore;
