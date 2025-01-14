import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

export interface VideoPlayerScreenProps {
  video: string;
  title: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
}

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({
  video,
  title,
  price,
  description,
  rating,
  reviews,
  duration,
}) => {
  return (
    <View style={styles.container}>
      {/* Video Player */}
      <Video
        source={{ uri: video }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
      {/* Details */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.rating}>
        {rating} ({reviews} reviews)
      </Text>
      <Text style={styles.duration}>{duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  video: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#E91E63",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
});

export default VideoPlayerScreen;
