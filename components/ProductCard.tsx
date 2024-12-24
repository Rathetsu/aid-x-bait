import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { ProductCardProps } from "@/types/type";

const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<View className="w-[44vw] bg-white rounded-lg shadow-md overflow-hidden mb-4">
			{/* Image Section */}
			<View className="relative">
				<Image
					source={{ uri: product.image }}
					className="w-full h-28"
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
					<Icon name="favorite" size={20} color="#007AFF" /> {/* Heart Icon */}
				</TouchableOpacity>
			</View>

			{/* Details Section */}
			<View className="p-2">
				<Text className="text-sm font-semibold text-gray-800">
					{product.title}
				</Text>

				{/* Price and Cart Row */}
				<View className="flex-row items-center justify-between mt-1">
					<Text className="text-lg text-orange-500 font-medium">
						{product.price}
					</Text>
					<TouchableOpacity className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
						<Icon name="shopping-cart" size={16} color="#007AFF" />{" "}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ProductCard;
