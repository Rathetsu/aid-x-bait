import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VideoPlayer from "@/components/VideoPlayer";

const WatchVideo = () => {
	const selectedVideo = useLocalSearchParams();

	if (!selectedVideo) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text>Video not found</Text>
			</SafeAreaView>
		);
	}

	return (
		<VideoPlayer
			video={selectedVideo.video as string}
			title={selectedVideo.title as string}
			poster={selectedVideo.poster as string}
			description={selectedVideo.description as string}
		/>
	);
};

export default WatchVideo;
