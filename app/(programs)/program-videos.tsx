import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VideoPlayer from "@/components/VideoPlayer";
import { ExerciseVideo } from "@/types/type";

const ProgramVideos = () => {
	const params = useLocalSearchParams();

	const selectedProgram = useMemo(() => {
		const parsedVideos = params.videos
			? JSON.parse(params.videos as string)
			: [];
		return { ...(params as any), videos: parsedVideos };
	}, [params]);

	const [selectedVideo, setSelectedVideo] = useState<ExerciseVideo | null>(
		null
	);

	useEffect(() => {
		if (!selectedProgram.videos || selectedProgram.videos.length === 0) return;

		const firstFreeVideo =
			selectedProgram.videos.find((video: ExerciseVideo) => video.isFree) ||
			null;

		setSelectedVideo((prev) => {
			if (prev?.id !== firstFreeVideo?.id) {
				return firstFreeVideo;
			}
			return prev;
		});
	}, [selectedProgram.videos]);

	if (!selectedProgram) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text>Program not found</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Video Section */}
			<View className="flex-1">
				{selectedVideo && selectedVideo.isFree ? (
					<View className="w-full">
						<VideoPlayer
							video={selectedVideo.video}
							title={selectedVideo.title}
							poster={selectedVideo.thumbnail}
							description={selectedVideo.description}
						/>
					</View>
				) : (
					<View className="w-full h-48 bg-gray-300 flex items-center justify-center">
						<Text className="text-gray-600">Enroll to unlock this video</Text>
					</View>
				)}
			</View>

			{/* Program Info */}
			<ScrollView className="flex-1">
				<View className="p-4">
					<Text className="text-xl font-bold">{selectedProgram.title}</Text>
					<Text className="text-gray-500 mt-1">
						{selectedProgram.description}{" "}
						<Text className="text-blue-500">...See More</Text>
					</Text>

					{/* Rating and Price */}
					<View className="flex-row items-center mt-2">
						<Ionicons name="star" size={16} color="gold" />
						<Text className="ml-1 text-gray-700">
							{selectedProgram.rating} ({selectedProgram.reviews} reviews)
						</Text>
						<View className="ml-auto bg-blue-100 px-2 py-1 rounded">
							<Text className="text-blue-500 font-semibold">
								{selectedProgram.duration}
							</Text>
						</View>
					</View>

					{/* Section Title */}
					<Text className="mt-4 text-lg font-semibold">Exercise Content</Text>

					{/* Video List */}
					<View className="mt-2">
						{selectedProgram.videos.map(
							(video: ExerciseVideo, index: number) => (
								<TouchableOpacity
									key={video.id}
									onPress={() => video.isFree && setSelectedVideo(video)}
									className={`flex-row items-center p-3 my-2 rounded-lg ${
										video.isFree ? "bg-blue-100" : "bg-gray-200"
									}`}
								>
									<Ionicons
										name={video.isFree ? "play-circle" : "lock-closed"}
										size={24}
										color={video.isFree ? "blue" : "gray"}
									/>
									<Text
										className={`ml-4 text-lg ${
											video.isFree ? "text-black" : "text-gray-500"
										}`}
									>
										{video.title}
									</Text>
									<Text className="ml-auto text-gray-500">
										{video.duration}
									</Text>
								</TouchableOpacity>
							)
						)}
					</View>
				</View>
			</ScrollView>

			{/* Enroll Button */}
			<TouchableOpacity className="bg-blue-500 p-4 rounded-full items-center justify-center mx-4 mb-4">
				<Text className="text-white font-bold text-lg">
					Enroll {selectedProgram.price} L.E
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default ProgramVideos;
