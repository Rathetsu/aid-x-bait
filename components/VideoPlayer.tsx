import { Video } from "expo-av";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
			<Video
				source={{ uri: video }}
				posterSource={{ uri: poster }}
				usePoster
				posterStyle={{ resizeMode: "cover", width: "100%", height: 250 }}
				style={{ width: "100%", height: 250, marginBottom: 16, zIndex: 2 }}
				shouldPlay
				useNativeControls
				// resizeMode="contain"
				isLooping
			/>
			{/* Video Description */}
			<Text className="text-base mx-4">{description}</Text>
		</SafeAreaView>
	);
};

export default CustomVideoPlayer;
