import { router } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Video {
	id: number;
	title: string;
	poster: string;
	doctor: string;
	price: string;
	rating: number;
	reviews: number;
	duration: string;
	description: string;
	image: string;
	video: string;
}

interface Program {
	id: number;
	title: string;
	doctor: string;
	price: string;
	rating: number;
	reviews: number;
	duration: string;
	description: string;
	image: string;
	isBestSeller: boolean;
	videos: Video[];
}

const programs: Program[] = [
	{
		id: 1,
		title: "Orthopedic Essentials",
		doctor: "Dr. Ahmed Azzam",
		price: "200 E.L",
		rating: 4.9,
		reviews: 231,
		duration: "3h 45m",
		description: "Learn about common orthopedic issues and treatments.",
		image: "https://via.placeholder.com/150",
		isBestSeller: true,
		videos: [
			{
				id: 101,
				title: "Common Bone Problems",
				poster: "https://via.placeholder.com/150",
				doctor: "Dr. Ahmed Azzam",
				price: "200 E.L",
				rating: 4.9,
				reviews: 231,
				duration: "1h 15m",
				description: "An overview of common bone issues and treatments.",
				image: "https://via.placeholder.com/150",
				video: "https://www.w3schools.com/html/mov_bbb.mp4",
			},
			{
				id: 102,
				title: "Fracture Management",
				poster: "https://via.placeholder.com/150",
				doctor: "Dr. Ahmed Azzam",
				price: "200 E.L",
				rating: 4.8,
				reviews: 198,
				duration: "1h 30m",
				description: "Learn how fractures are diagnosed and treated.",
				image: "https://via.placeholder.com/150",
				video: "https://www.w3schools.com/html/movie.mp4",
			},
		],
	},
	{
		id: 2,
		title: "First Aid Masterclass",
		doctor: "Dr. John Doe",
		price: "150 E.L",
		rating: 4.7,
		reviews: 189,
		duration: "2h 30m",
		description: "A complete guide to essential first aid techniques.",
		image: "https://via.placeholder.com/150",
		isBestSeller: false,
		videos: [
			{
				id: 201,
				title: "First Aid Basics",
				poster: "https://via.placeholder.com/150",
				doctor: "Dr. John Doe",
				price: "150 E.L",
				rating: 4.7,
				reviews: 189,
				duration: "45m",
				description:
					"Learn the basics of first aid in this comprehensive guide.",
				image: "https://via.placeholder.com/150",
				video: "https://www.w3schools.com/html/movie.mp4",
			},
			{
				id: 202,
				title: "CPR Techniques",
				poster: "https://via.placeholder.com/150",
				doctor: "Dr. John Doe",
				price: "150 E.L",
				rating: 4.9,
				reviews: 220,
				duration: "1h 15m",
				description:
					"A detailed breakdown of CPR techniques and when to use them.",
				image: "https://via.placeholder.com/150",
				video: "https://www.w3schools.com/html/mov_bbb.mp4",
			},
		],
	},
];

const handleProgramPress = (program: Program) => {
	router.push({
		pathname: "/(programs)/program-videos",
		params: { ...program },
	});
};

const renderItem = ({ item }: { item: Program }) => (
	<TouchableOpacity
		className={`flex-1 bg-white m-2 rounded-lg shadow-lg`}
		onPress={() => handleProgramPress(item)}
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
				<Text className={`text-sm font-bold text-gray-800`}>{item.rating}</Text>
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

const VideoGallery = () => {
	return (
		<SafeAreaView className={`flex-1 bg-white`}>
			<FlatList
				data={programs}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
			/>
		</SafeAreaView>
	);
};

export default VideoGallery;
