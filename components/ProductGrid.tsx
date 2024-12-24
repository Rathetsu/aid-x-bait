import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { ProductGridProps } from "@/types/type";

import ProductCard from "./ProductCard";

const ProductGrid = ({ title, products }: ProductGridProps) => {
	return (
		<View className="px-4 py-6 mt-4">
			{/* Header */}
			<View className="flex-row justify-between items-center mb-4">
				<View className="flex-row items-center">
					<View className="w-1 h-7 bg-orange-500 mr-2" />
					<Text className="text-lg font-semibold text-gray-800">{title}</Text>
				</View>
				<TouchableOpacity>
					<Text className="text-orange-500 text-sm font-medium">See More</Text>
				</TouchableOpacity>
			</View>

			{/* Product Grid */}
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductCard product={item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				nestedScrollEnabled
			/>
		</View>
	);
};

export default ProductGrid;
