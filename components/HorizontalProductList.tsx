import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { ProductGridProps } from "@/types/type";

import ProductCard from "./ProductCard";

const HorizontalProductList: React.FC<ProductGridProps> = ({
	title,
	products,
}) => {
	return (
		<View className="px-4 mt-4">
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

			{/* Horizontal Scrollable List */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={true}
				contentContainerStyle={{ paddingHorizontal: 4 }}
			>
				{products.map((product) => (
					<View key={product.id} className="mr-4">
						<ProductCard product={product} isForRent={true} isWide={true} />
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default HorizontalProductList;
