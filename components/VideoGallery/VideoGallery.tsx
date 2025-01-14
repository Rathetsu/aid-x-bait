import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import VideoPlayerScreen, { VideoPlayerScreenProps } from './VideoPlayerScreen/VideoPlayerScreen'; // Import the VideoPlayerScreen component

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoPlayerScreenProps>(); // To open the VideoPlayerScreen modal

  // Placeholder video data
  const videos = [
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

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleVideoPress(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.isBestSeller && (
          <View style={styles.bestSellerBadge}>
            <Text style={styles.bestSellerText}>Best Seller</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.doctor}>{item.doctor}</Text>
      <View style={styles.ratingContainer}>
        <Text>
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}> ({item.reviews} reviews)</Text>
        </Text>
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
  },
  bestSellerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  bestSellerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 8,
  },
  doctor: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 10,
    marginTop: 4,
  },
  ratingContainer: {
    marginHorizontal: 10,
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 8,
  },
});

export default VideoGallery;
