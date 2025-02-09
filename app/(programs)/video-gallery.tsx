import { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VideoPlayer from "@/components/VideoPlayer";
import { VideoPlayerProps } from "@/types/type";

const VideoGallery = () => {
	const [selectedVideo, setSelectedVideo] = useState<VideoPlayerProps | null>(
		null
	);

	const videos = [
		{
			id: 1,
			title: "Common Bone Problems",
			doctor: "Dr. Ahmed Azzam",
			price: "200 E.L",
			rating: 4.9,
			reviews: 231,
			duration: "1h 15m",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
			image: "https://via.placeholder.com/150",
			video: "https://www.w3schools.com/html/mov_bbb.mp4",
			isBestSeller: true,
		},
		{
			id: 2,
			title: "First Aid Basics",
			doctor: "Dr. John Doe",
			price: "150 E.L",
			rating: 4.7,
			reviews: 189,
			duration: "45m",
			description:
				"Learn the basics of first aid in this comprehensive guide...",
			image: "https://via.placeholder.com/150",
			video: "https://www.w3schools.com/html/movie.mp4",
			isBestSeller: false,
		},
	];

	const handleVideoPress = (video: VideoPlayerProps) => {
		setSelectedVideo(video);
	};

	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity
			className={`flex-1 bg-white m-2 rounded-lg shadow-lg`}
			onPress={() => handleVideoPress(item)}
		>
			<View className={`relative`}>
				<Image
					source={{ uri: item.image }}
					className={`w-full h-40 rounded-t-lg`}
				/>
				{item.isBestSeller && (
					<View
						className={`absolute top-2 left-2 bg-orange-600 px-2 py-1 rounded-md`}
					>
						<Text className={`text-white text-xs font-bold`}>Best Seller</Text>
					</View>
				)}
			</View>
			<View className={`p-3`}>
				<Text className={`text-sm font-bold`}>{item.title}</Text>
				<Text className={`text-xs text-gray-500 mt-1`}>{item.doctor}</Text>
				<View className={`flex-row items-center mt-1`}>
					<Text className={`text-sm font-bold text-gray-800`}>
						{item.rating}
					</Text>
					<Text className={`text-xs text-gray-500 ml-1`}>
						({item.reviews} reviews)
					</Text>
				</View>
				<Text className={`text-sm font-bold text-gray-900 mt-1`}>
					{item.price}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className={`flex-1 bg-white`}>
			<FlatList
				data={videos}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
			/>

			{selectedVideo && (
				<Modal
					visible={!!selectedVideo}
					transparent={false}
					animationType="slide"
					onRequestClose={() => setSelectedVideo(null)}
				>
					<VideoPlayer
						video={selectedVideo.video}
						title={selectedVideo.title}
						price={selectedVideo.price}
						description={selectedVideo.description}
						rating={selectedVideo.rating}
						reviews={selectedVideo.reviews}
						duration={selectedVideo.duration}
					/>
				</Modal>
			)}
		</SafeAreaView>
	);
};

export default VideoGallery;
