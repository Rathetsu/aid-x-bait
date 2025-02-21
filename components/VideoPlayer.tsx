import { router } from "expo-router";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPlayer from "react-native-video-player";

import { VideoPlayerProps } from "@/types/type";

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({
	video,
	title,
	poster,
	description,
}) => {
	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Video Title */}
			<Text className="text-lg font-bold text-center my-2">{title}</Text>
			{/* Video Player */}
			<VideoPlayer
				source={{ uri: video }}
				poster={poster}
				posterResizeMode="cover"
				style={{ width: "100%", height: 250, marginBottom: 16 }}
				autoplay={true}
				showDuration={true}
				controls={true}
				// onBack={() => router.back()}
				fullScreenOnLongPress={true}
				playInBackground={false}
				playWhenInactive={false}
				ignoreSilentSwitch={"ignore"}
				endWithThumbnail={true}
				hideControlsOnStart={true}
				controlsTimeout={3000}
				pauseOnPress={true}
				repeat={true}
				resizeMode="contain"
				fullscreenOrientation="portrait"
				fullscreenAutorotate={true}
				customStyles={{
					wrapper: styles.wrapper,
					playControl: styles.playControl,
					seekBarKnob: styles.seekBarKnob,
				}}
			/>
			{/* Video Description */}
			<Text className="text-base mx-4">{description}</Text>
		</SafeAreaView>
	);
};

export default CustomVideoPlayer;

const styles = StyleSheet.create({
	wrapper: {
		// ...
	},
	playControl: {
		// ...
	},
	seekBarKnob: {
		color: "#2E71A8",
	},
});
