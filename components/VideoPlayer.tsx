import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

import { VideoPlayerProps } from "@/types/type";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	video,
	title,
	price,
	description,
	rating,
	reviews,
	duration,
}) => {
	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Video Player */}
			<Video
				source={{ uri: video }}
				className="w-full h-52 mb-4"
				controls
				resizeMode="contain"
			/>
			{/* Details */}
			<Text className="text-xl font-bold my-2">{title}</Text>
			<Text className="text-lg text-pink-500 mb-2">{price}</Text>
			<Text className="text-sm text-gray-600 mb-2">{description}</Text>
			<Text className="text-base mb-2">
				{rating} ({reviews} reviews)
			</Text>
			<Text className="text-sm text-gray-600">{duration}</Text>
		</SafeAreaView>
	);
};

export default VideoPlayer;
