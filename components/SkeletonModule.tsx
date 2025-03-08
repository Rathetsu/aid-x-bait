import { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";

import { images, icons } from "@/constants";

type SkeletonModuleProps = {
	onNavigate: (boneName: string) => void;
};

const SkeletonModule: React.FC<SkeletonModuleProps> = ({ onNavigate }) => {
	// State to track the actual rendered size of the image
	const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

	const figure = images.femaleJogging;
	const overlay = icons.blueOverlay;

	const overlayPositions = [
		{
			bodyPart: "Cervical Spine",
			top: imageSize.height * 0.11,
			left: imageSize.width * 0.3,
		},
		{
			bodyPart: "Shoulder",
			top: imageSize.height * 0.18,
			left: imageSize.width * 0.4,
		},
		{
			bodyPart: "Elbow",
			top: imageSize.height * 0.38,
			left: imageSize.width * 0.2,
		},
		{
			bodyPart: "Wrist & Hand",
			top: imageSize.height * 0.38,
			left: imageSize.width * 0.65,
		},
		{
			bodyPart: "Lumbar Spine",
			top: imageSize.height * 0.38,
			left: imageSize.width * 0.45,
		},
		{
			bodyPart: "Hip",
			top: imageSize.height * 0.48,
			left: imageSize.width * 0.5,
		},
		{
			bodyPart: "Knee",
			top: imageSize.height * 0.69,
			left: imageSize.width * 0.16,
		},
		{
			bodyPart: "Ankle & Foot",
			top: imageSize.height * 0.85,
			left: imageSize.width * 0.52,
		},
	];

	const handlePress = (bodyPart: string) => {
		Alert.alert(`${bodyPart} clicked!`);
	};

	return (
		<View className="flex-1 items-center justify-center">
			<View className="relative">
				{/* Render Figure */}
				<Image
					source={figure}
					style={{ width: "80%", height: undefined, aspectRatio: 300 / 500 }}
					resizeMode="contain"
					onLayout={(event) => {
						const { width, height } = event.nativeEvent.layout;
						setImageSize({ width, height });
					}}
				/>

				{/* Render Overlays */}
				{overlayPositions.map((pos, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => handlePress(pos.bodyPart)}
						style={{
							position: "absolute",
							top: pos.top,
							left: pos.left,
							transform: [{ translateX: -15 }, { translateY: -15 }],
						}}
					>
						<Image source={overlay} className="w-[30px] h-[30px]" />
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default SkeletonModule;
