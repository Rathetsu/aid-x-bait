// InteractiveSkeleton.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import SkeletonSvg from '../../../assets/images/skeleton.svg'; // <-- import your skeleton with all its paths

type NavigationProps = {
  navigate: (screen: string, params?: { area?: string }) => void;
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function InteractiveSkeleton() {
  const navigation = useNavigation<NavigationProps>();

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

  // Common handler for all paths
  const handleAllPathsPress = () => {
    navigation.navigate('Videos', { area: 'skull' });
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
        <AnimatedSvg
          style={[styles.svg, animatedStyle]}
          width="100%"
          height="100%"
          viewBox="0 0 736 1104"
        >
          <SkeletonSvg onPathPress={handleAllPathsPress} />
        </AnimatedSvg>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
