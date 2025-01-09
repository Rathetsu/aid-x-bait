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

declare interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	discountedPrice: number;
	currency: string;
	stock: number;
	image: ImageSourcePropType;
	images: ImageSourcePropType[];
	categoryId: number;
	isBestSeller: boolean;
	isFeatured: boolean;
	isAvailable: boolean;
	isForRent: boolean;
	rentTerm: string;
	isFreeShipping: boolean;
	tags: string[];
}

declare interface ProductGridProps {
	title: string;
	products: Product[];
}

declare interface ProductCardProps {
	product: Product;
	isForRent?: boolean;
	isWide?: boolean;
}

declare interface ProductPreviewProps {
	product: Product;
	forRent?: boolean;
	freeShipping?: boolean;
}

declare interface CartItem {
	id: number;
	product_id: number;
	name: string;
	price: number;
	currency: string;
	quantity: number;
}

declare interface CartState {
	items: CartItem[];
	discountCode: string;
	discountAmount: number;
	deliveryFee: number;
}

declare interface DatePickerDate {
	day: string;
	date: string;
}

declare interface DatePickerProps {
	selectedDate: string | null;
	setSelectedDate: (date: string | null) => void;
}
