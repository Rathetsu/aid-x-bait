import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";

import HorizontalProductList from "@/components/HorizontalProductList";
import { ProductPreviewProps } from "@/types/type";

const ProductPreview = ({
	product,
	forRent,
	freeShipping,
}: ProductPreviewProps) => {
	const { images, name, discountedPrice, price, rentTerm } = product;

	// TODO: Get the calculated rating from the backend
	const rating = { value: 4.5, count: 100 };

	const getSimilarProducts = (tags: string[] = product.tags) => {
		// TODO: get all products with a request to the backend
		const products = [
			{
				id: 1,
				name: "Product 1",
				description: "Product 1 description",
				price: 100,
				discountedPrice: 80,
				stock: 10,
				image: { uri: "https://picsum.photos/200" },
				images: [{ uri: "https://picsum.photos/200" }],
				categoryId: 1,
				isBestSeller: true,
				isFeatured: false,
				isAvailable: true,
				isForRent: false,
				rentTerm: "",
				isFreeShipping: true,
				tags: ["knee", "belt"],
			},
			{
				id: 2,
				name: "Product 2",
				description: "Product 2 description",
				price: 200,
				discountedPrice: 180,
				stock: 5,
				image: { uri: "https://picsum.photos/200" },
				images: [{ uri: "https://picsum.photos/200" }],
				categoryId: 2,
				isBestSeller: false,
				isFeatured: true,
				isAvailable: true,
				isForRent: true,
				rentTerm: "1 month",
				isFreeShipping: false,
				tags: ["leg", "elbow"],
			},
			{
				id: 3,
				name: "Product 3",
				description: "Product 3 description",
				price: 300,
				discountedPrice: 280,
				stock: 20,
				image: { uri: "https://picsum.photos/200" },
				images: [{ uri: "https://picsum.photos/200" }],
				categoryId: 3,
				isBestSeller: false,
				isFeatured: false,
				isAvailable: false,
				isForRent: false,
				rentTerm: "",
				isFreeShipping: true,
				tags: ["spine", "back"],
			},
		];

		// return the products with at least one matching tag
		const similarProducts = tags.flatMap((tag) =>
			products.filter((product) => product.tags.includes(tag))
		);

		return Array.from(new Set(similarProducts));
	};

	const PAGE_WIDTH = Dimensions.get("window").width;

	return (
		<ScrollView className="flex-1 bg-white">
			{/* Image Carousel */}
			<Carousel
				loop
				autoPlay
				scrollAnimationDuration={1200}
				width={PAGE_WIDTH}
				height={240}
				data={images}
				mode="parallax"
				renderItem={({ item, animationValue }) => (
					<Image
						source={
							typeof product.image === "string"
								? { uri: product.image }
								: product.image
						}
						className="w-full h-64"
						resizeMode="cover"
					/>
				)}
			/>

			{/* Product name */}
			<View className="px-4 mt-4">
				<Text className="text-xl font-semibold text-gray-900">
					{name} {forRent && "For Rent"}
				</Text>
				{/* Rating */}
				<View className="flex-row items-center mt-2">
					<Text className="text-gray-600 text-sm">({rating.count})</Text>
					<Icon name="star" size={14} color="#FFD700" />
					<Text className="text-sm ml-1">{rating.value.toFixed(1)}</Text>
				</View>
			</View>

			{/* Pricing */}
			<View className="px-4 flex-row items-center justify-between mt-4">
				<View>
					<Text className="text-2xl font-bold text-orange-500">
						{discountedPrice} L.E
					</Text>
					{discountedPrice !== price && (
						<Text className="text-sm text-gray-400 line-through">
							{price} L.E
						</Text>
					)}
				</View>
				{freeShipping && (
					<View className="bg-green-100 px-2 py-1 rounded-lg">
						<Text className="text-xs font-medium text-green-500">
							Free Shipping
						</Text>
					</View>
				)}
			</View>

			{/* Duration (For Rent) */}
			{forRent && (
				<View className="px-4 flex-row items-center mt-2">
					<Icon name="event" size={18} color="#4A4A4A" />
					<Text className="ml-2 text-sm text-gray-600">
						Duration: {rentTerm}
					</Text>
				</View>
			)}

			{/* Product Details */}
			<View className="px-4 mt-6">
				<Text className="text-lg font-medium text-gray-800 mb-2">
					Product Details
				</Text>
				<Text className="text-sm text-gray-600">{product.description}</Text>
			</View>

			{/* How To Use Section */}
			<TouchableOpacity className="px-4 mt-4 flex-row items-center justify-between bg-gray-50 py-3">
				<Text className="text-sm font-medium text-gray-800">How To Use It</Text>
				<Icon name="arrow-forward-ios" size={16} color="#4A4A4A" />
			</TouchableOpacity>

			{/* Similar Products */}
			<HorizontalProductList
				title={forRent ? "Rent More" : "Similar Products"}
				products={getSimilarProducts()}
			/>

			{/* Bottom Button */}
			<View className="px-4 mt-6">
				<TouchableOpacity className="w-full py-3 rounded-lg bg-blue-500 flex-row items-center justify-center">
					<Text className="text-white text-lg font-semibold">
						{forRent ? "Rent Now" : "Buy Now"}
					</Text>
					<Icon
						name={forRent ? "event" : "shopping-cart"}
						size={20}
						color="#fff"
						className="ml-2"
					/>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default ProductPreview;
