import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { ProductCardProps } from "@/types/type";

const ProductCard = ({
	product,
	isForRent,
	isWide,
	onClick,
}: ProductCardProps & { onClick?: () => void }) => {
	return (
		<TouchableOpacity
			onPress={onClick}
			activeOpacity={0.8}
			className={`${
				isWide ? "w-[60vw]" : "w-[44vw]"
			} bg-white rounded-lg shadow-md overflow-hidden mb-4`}
		>
			{/* Image Section */}
			<View className="relative">
				<Image
					source={
						typeof product.image === "string"
							? { uri: product.image }
							: product.image
					}
					className={`${isWide ? "h-36" : "h-28"} w-full`}
					resizeMode="cover"
				/>
				{product.isBestSeller && (
					<View className="absolute top-2 left-2 bg-orange-500 px-2 py-1 rounded-md">
						<Text className="text-xs text-white font-semibold">
							Best Seller
						</Text>
					</View>
				)}
				<TouchableOpacity className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full">
					<Icon name="favorite" size={20} color="#007AFF" />
				</TouchableOpacity>
			</View>

			{/* Details Section */}
			<View className="p-2">
				{/* Title and Price Row (for isWide) */}
				{isWide ? (
					<View className="flex-row items-center justify-between">
						<Text className="text-sm font-semibold text-gray-800 flex-1">
							{product.title}
						</Text>
						<Text className="text-lg text-orange-500 font-medium">
							{product.price}
						</Text>
					</View>
				) : (
					// Title Only (standard layout)
					<Text className="text-sm font-semibold text-gray-800">
						{product.title}
					</Text>
				)}

				{/* Duration and Cart Row */}
				{isForRent && (
					<View
						className={`flex-row items-center justify-between ${
							isWide ? "mt-1" : "mt-2"
						}`}
					>
						<View className="flex-row items-center">
							<Icon name="event" size={16} color="#4A4A4A" />
							<Text className="ml-1 text-xs text-gray-600">
								Duration: {product.duration}
							</Text>
						</View>
						<TouchableOpacity className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<Icon name="shopping-cart" size={16} color="#007AFF" />
						</TouchableOpacity>
					</View>
				)}

				{/* Price and Cart Row for Standard Layout */}
				{!isWide && (
					<View className="flex-row items-center justify-between mt-1">
						<Text className="text-lg text-orange-500 font-medium">
							{product.price}
						</Text>
						<TouchableOpacity className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<Icon name="shopping-cart" size={16} color="#007AFF" />
						</TouchableOpacity>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default ProductCard;
