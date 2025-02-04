import { SafeAreaView } from "react-native-safe-area-context";

import VideoUI from "@/components/VideoUI";

const videoCall = () => {
	return (
		<SafeAreaView>
			<VideoUI />
		</SafeAreaView>
	);
};

export default videoCall;
