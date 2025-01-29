import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg from 'react-native-svg';
import { useRouter } from 'expo-router';
import SkeletonSvg from '../../../assets/images/skeleton.svg'; // Ensure this import is correct

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function InteractiveSkeleton() {
  const router = useRouter();

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // Pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value += e.translationX - savedTranslateX.value;
      translateY.value += e.translationY - savedTranslateY.value;
      savedTranslateX.value = e.translationX;
      savedTranslateY.value = e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    });

  // Combine transforms
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Navigation handlers
  const handleSkullPress = () => {
    router.push('/videos');
  };

  const handleNeckPress = () => {
    router.push('/videos');
  };

  const handleTorsoPress = () => {
    router.push('/videos');
  };

  const handleArmsPress = () => {
    router.push('/videos');
  };

  return (
    <View className="flex-1">
      <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
        <Animated.View style={[animatedStyle]} className="flex-1 relative bg-white">
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 736 1104"
          >
            <SkeletonSvg />
          </Svg>
          {/* Define clickable areas */}
          <TouchableOpacity
            className="absolute top-50 left-300 w-100 h-100"
            onPress={handleSkullPress}
          />
          <TouchableOpacity
            className="absolute top-150 left-320 w-60 h-80"
            onPress={handleNeckPress}
          />
          <TouchableOpacity
            className="absolute top-230 left-280 w-160 h-200"
            onPress={handleTorsoPress}
          />
          <TouchableOpacity
            className="absolute top-250 left-180 w-320 h-100"
            onPress={handleArmsPress}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}