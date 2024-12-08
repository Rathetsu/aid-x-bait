import {
	ImageSourcePropType,
	TextInputProps,
	TouchableOpacityProps,
} from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
	title: string;
	bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
	textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
	IconLeft?: React.ComponentType<any>;
	IconRight?: React.ComponentType<any>;
	className?: string;
}

declare interface InputFieldProps extends TextInputProps {
	label: string;
	icon?: any;
	secureTextEntry?: boolean;
	labelStyle?: string;
	containerStyle?: string;
	inputStyle?: string;
	iconStyle?: string;
	className?: string;
	lowercase?: boolean;
}

declare interface GoogleInputProps {
	icon?: string;
	initialLocation?: string;
	containerStyle?: string;
	textInputBackgroundColor?: string;
	handlePress: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}

declare type ServicePath =
	| "/(root)/home-visits"
	| "/(root)/online-consultations"
	| "/(root)/aidxbait-store"
	| "/(root)/exercise-programs";

declare interface Service {
	name: string;
	icon: ImageSourcePropType;
	desc: string;
	bg: ImageSourcePropType;
	path: ServicePath;
}
