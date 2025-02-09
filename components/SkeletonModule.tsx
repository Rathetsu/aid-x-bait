import { View, Alert } from "react-native";
import { Svg, Circle, Rect } from "react-native-svg";

type SkeletonModuleProps = {
	onNavigate: (boneName: string) => void;
};

const SkeletonModule: React.FC<SkeletonModuleProps> = ({ onNavigate }) => {
	const handlePress = (bodyPart: string) => {
		Alert.alert(`${bodyPart} clicked!`);
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Svg width="200" height="400" viewBox="0 0 200 400">
				{/* Head */}
				<Circle
					cx="100"
					cy="50"
					r="30"
					fill="lightblue"
					onPress={() => handlePress("Head")}
				/>
				{/* Body */}
				<Rect
					x="70"
					y="80"
					width="60"
					height="100"
					fill="lightgreen"
					onPress={() => handlePress("Body")}
				/>
				{/* Left Arm */}
				<Rect
					x="30"
					y="80"
					width="30"
					height="100"
					fill="lightcoral"
					onPress={() => handlePress("Left Arm")}
				/>
				{/* Right Arm */}
				<Rect
					x="140"
					y="80"
					width="30"
					height="100"
					fill="lightcoral"
					onPress={() => handlePress("Right Arm")}
				/>
				{/* Left Leg */}
				<Rect
					x="70"
					y="190"
					width="30"
					height="100"
					fill="yellow"
					onPress={() => handlePress("Left Leg")}
				/>
				{/* Right Leg */}
				<Rect
					x="100"
					y="190"
					width="30"
					height="100"
					fill="khaki"
					onPress={() => handlePress("Right Leg")}
				/>
			</Svg>
		</View>
	);
};

export default SkeletonModule;
