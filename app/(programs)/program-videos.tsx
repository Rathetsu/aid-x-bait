import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VideoPlayer from "@/components/VideoPlayer";
import { ExerciseProgram, ExerciseVideo } from "@/types/type";

const ProgramVideos = () => {
	const selectedProgram = useLocalSearchParams() as unknown as ExerciseProgram;

	if (!selectedProgram) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text>Video not found</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="flex-row items-center p-4">
				<TouchableOpacity
					onPress={() => {
						router.back();
					}}
				>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<Text className="ml-4 text-lg font-bold flex-1">
					{selectedVideo.title}
				</Text>
				<TouchableOpacity>
					<MaterialIcons name="bookmark-border" size={24} color="black" />
				</TouchableOpacity>
			</View>

			{/* Video Player */}
			<VideoPlayer
				video={selectedVideo.video as string}
				title={selectedVideo.title as string}
				poster={selectedVideo.poster as string}
				description={selectedVideo.description as string}
			/>

			{/* Course Details */}
			<ScrollView className="px-4">
				<Text className="text-xl font-bold mt-2">{selectedVideo.title}</Text>
				<Text className="text-blue-500 font-semibold">
					{selectedVideo.price} E.L
				</Text>
				<Text className="text-gray-500 mt-1">
					{selectedVideo.description}{" "}
					<Text className="text-blue-500">...See More</Text>
				</Text>

				{/* Rating and Duration */}
				<View className="flex-row items-center mt-2">
					<Ionicons name="star" size={16} color="gold" />
					<Text className="ml-1 text-gray-700">
						{selectedVideo.rating} ({selectedVideo.reviews} reviews)
					</Text>
					<Ionicons
						name="time-outline"
						size={16}
						color="gray"
						className="ml-4"
					/>
					<Text className="ml-1 text-gray-700">{selectedVideo.duration}</Text>
				</View>

				{/* Tabs */}
				<View className="flex-row mt-4 border-b">
					<TouchableOpacity className="border-b-2 border-blue-500 pb-2 px-4">
						<Text className="text-blue-500 font-semibold">
							Exercise Content
						</Text>
					</TouchableOpacity>
					<TouchableOpacity className="px-4">
						<Text className="text-gray-500">Reviews</Text>
					</TouchableOpacity>
				</View>

				{/* Lesson List */}
				<View className="mt-4">
					{(selectedVideo.lessons ?? []).map((lesson, index) => (
						<View
							key={index}
							className={`flex-row items-center p-3 my-2 rounded-lg ${lesson.locked ? "bg-gray-200" : "bg-blue-100"}`}
						>
							<Ionicons
								name={lesson.locked ? "lock-closed" : "play-circle"}
								size={24}
								color={lesson.locked ? "gray" : "blue"}
							/>
							<Text
								className={`ml-4 text-lg ${lesson.locked ? "text-gray-500" : "text-black"}`}
							>
								{lesson.title}
							</Text>
							<Text className="ml-auto text-gray-500">{lesson.duration}</Text>
						</View>
					))}
				</View>
			</ScrollView>

			{/* Enroll Button */}
			<TouchableOpacity className="bg-blue-500 p-4 rounded-full items-center justify-center mx-4 mb-4">
				<Text className="text-white font-bold text-lg">Enroll Now</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default ProgramVideos;
