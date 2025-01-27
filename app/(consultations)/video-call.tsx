import { StreamCall } from "@stream-io/video-react-native-sdk";
import { SafeAreaView } from "react-native-safe-area-context";

import VideoUI from "@/components/VideoUI";

import { streamClient } from "./_layout";

const videoCall = () => {
	const callId = "6VngS2sYvEwW";
	const call = streamClient.call("default", callId);
	call.join({ create: true });
	return (
		<SafeAreaView>
			<StreamCall call={call}>
				<VideoUI />
			</StreamCall>
		</SafeAreaView>
	);
};

export default videoCall;
