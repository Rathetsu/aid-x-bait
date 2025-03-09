import {
	ImageSourcePropType,
	TextInputProps,
	TouchableOpacityProps,
} from "react-native";

export type Roles = "admin" | "patient" | "therapist" | "support";

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

declare interface ExerciseVideo {
	id: number;
	title: string;
	duration: string;
	isFree: boolean;
	description: string;
	thumbnail: string;
	video: string;
}

declare interface ExerciseProgram {
	id: number;
	title: string;
	price: string;
	rating: number;
	reviews: number;
	duration: string;
	description: string;
	image: string;
	videos: ExerciseVideo[];
}

declare interface VideoPageProps {
	video: string;
	title: string;
	poster: string;
	price: string;
	description: string;
	duration: string;
}
declare interface VideoPlayerProps {
	video: string;
	title: string;
	poster: string;
	description: string;
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

declare interface BookingModuleProps {
	onPressBookVisit: () => void;
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

declare interface User {
	id: number;
	patientId: number;
	firstName: string;
	lastName: string;
	email: string;
	imageUrl: string;
	phone: string;
}

declare interface UserState {
	user: User | null;
	isLoggedIn: boolean;
}

declare interface Address {
	id: number;
	address_type: string;
	address_label: string;
	governorate: string;
	city: string;
	street: string;
	building_name?: string;
	floor?: string;
	apartment?: string;
	additional_directions?: string;
	phone?: string;
	is_primary?: boolean;
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

declare interface LocationState {
	userLatitude: number | null;
	userLongitude: number | null;
	userAddress: string | null;
}

declare interface LocationPayload {
	latitude: number;
	longitude: number;
	address: string;
}

declare interface MapProps {
	onMapPress: (latitude: number, longitude: number, address: string) => void;
	markerLocation: { latitude: number; longitude: number };
}

declare interface AppointmentCardProps {
	status: string;
	doctorName: string;
	specialty: string;
	date: string;
	time: string;
	buttonLabel: string;
	onPress: () => void;
}

declare interface TabsProps {
	activeTab: string;
	onChangeTab: (tab: string) => void;
}
