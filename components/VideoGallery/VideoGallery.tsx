// VideoGallery.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import VideoPlayerScreen, { VideoPlayerScreenProps } from './VideoPlayerScreen/VideoPlayerScreen'; // Import the VideoPlayerScreen component

// Define the Video type directly here
interface Video {
  id: number;
  title: string;
  doctor: string;
  price: string;
  rating: number;
  reviews: number;
  duration: string;
  description: string;
  image: string;
  video: string;
  isBestSeller: boolean;
}

// Placeholder video data
const videos: Video[] = [
  {
    id: 1,
    title: 'Common Bone Problems',
    doctor: 'Dr. Ahmed Azzam',
    price: '200 E.L',
    rating: 4.9,
    reviews: 231,
    duration: '1h 15m',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text...',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isBestSeller: true,
  },
  {
    id: 2,
    title: 'First Aid Basics',
    doctor: 'Dr. John Doe',
    price: '150 E.L',
    rating: 4.7,
    reviews: 189,
    duration: '45m',
    description:
      'Learn the basics of first aid in this comprehensive guide, suitable for anyone looking to handle emergencies...',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/movie.mp4',
    isBestSeller: false,
  },
  // Add more items as needed
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); // To open the VideoPlayerScreen modal

  useEffect(() => {
    console.log('Videos:', videos); // Debugging statement to check if videos are loaded
  }, []);

  const handleVideoPress = (video: Video) => {
    setSelectedVideo(video);
  };

  const renderVideoCard = (video: Video) => (
    <TouchableOpacity
      key={video.id}
      className="flex-1 bg-white m-2 rounded-lg overflow-hidden shadow-md shadow-gray-200"
      onPress={() => handleVideoPress(video)}
    >
      <View className="relative">
        <Image
          source={{ uri: video.image }}
          className="w-full h-40"
        />
        {video.isBestSeller && (
          <View className="absolute top-2 left-2 bg-orange-500 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">Best Seller</Text>
          </View>
        )}
      </View>
      <Text className="font-bold text-base mt-2 mx-2">{video.title}</Text>
      <Text className="text-gray-500 text-sm mx-2 mt-1">{video.doctor}</Text>
      <View className="flex-row items-center mx-2 mt-1">
        <Text className="font-bold text-gray-800 text-sm">
          {video.rating}
        </Text>
        <Text className="text-gray-500 text-sm">
          ({video.reviews} reviews)
        </Text>
      </View>
      <Text className="font-bold text-gray-800 text-sm mx-2 mt-1">{video.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 }}>
        {videos.map(renderVideoCard)}
      </ScrollView>
      {/* Modal for Video Player Screen */}
      {selectedVideo && (
        <Modal
          visible={!!selectedVideo}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setSelectedVideo(null)}
        >
          <VideoPlayerScreen
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
    </View>
  );
};

export default VideoGallery;