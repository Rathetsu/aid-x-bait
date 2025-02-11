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
			price={selectedVideo.price as string}
			description={selectedVideo.description as string}
			rating={parseFloat(selectedVideo.rating as string)}
			reviews={parseInt(selectedVideo.reviews as string)}
			duration={selectedVideo.duration as string}
		/>
	);
};

export default WatchVideo;
