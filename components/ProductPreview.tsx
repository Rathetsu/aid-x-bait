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
import { images as importedImages } from "@/constants";
import { ProductPreviewProps } from "@/types/type";

const ProductPreview = ({
	product,
	forRent,
	freeShipping,
}: ProductPreviewProps) => {
	const { images, name, discountedPrice, price, currency, rentTerm } = product;

	// TODO: Get the calculated rating from the backend
	const rating = { value: 4.5, count: 100 };

	const getSimilarProducts = (tags: string[] = product.tags) => {
		// TODO: get all products with a request to the backend
		const products = [
			{
				id: 1,
				name: "Adjustable Knee Brace",
				description:
					"This is a high-quality knee brace designed for superior support during physical therapy.",
				price: 250,
				discountedPrice: 200,
				currency: "L.E",
				stock: 15,
				image: importedImages.kneebrace,
				images: [importedImages.kneebrace, importedImages.shoulderbrace],
				categoryId: 1,
				isBestSeller: false,
				isFeatured: false,
				isAvailable: true,
				isForRent: true,
				rentTerm: "3 Months",
				isFreeShipping: true,
				tags: ["knee", "brace", "adjustable"],
			},
			{
				id: 2,
				name: "Compression Shoulder Brace",
				description:
					"Designed to provide support and stability for shoulder injuries and pain.",
				price: 200,
				discountedPrice: 180,
				currency: "L.E",
				stock: 20,
				image: importedImages.shoulderbrace,
				images: [importedImages.shoulderbrace],
				categoryId: 2,
				isBestSeller: false,
				isFeatured: true,
				isAvailable: true,
				isForRent: true,
				rentTerm: "Per day",
				isFreeShipping: false,
				tags: ["shoulder", "brace", "compression"],
			},
			{
				id: 3,
				name: "Lumbar Support Belt",
				description:
					"High-quality lumbar support belt designed to provide relief for lower back pain.",
				price: 300,
				discountedPrice: 250,
				currency: "L.E",
				stock: 10,
				image: importedImages.lumbarbelt,
				images: [importedImages.lumbarbelt],
				categoryId: 3,
				isBestSeller: true,
				isFeatured: false,
				isAvailable: true,
				isForRent: true,
				rentTerm: "1 Month",
				isFreeShipping: true,
				tags: ["lumbar", "support", "belt"],
			},
			{
				id: 4,
				name: "Therapeutic Wrist Wrap",
				description:
					"Designed to provide support and relief for wrist injuries and pain.",
				price: 200,
				discountedPrice: 180,
				currency: "L.E",
				stock: 25,
				image: importedImages.wristwrap,
				images: [importedImages.wristwrap],
				categoryId: 4,
				isBestSeller: false,
				isFeatured: true,
				isAvailable: true,
				isForRent: true,
				rentTerm: "Per day",
				isFreeShipping: false,
				tags: ["wrist", "wrap", "therapeutic"],
			},
		];

		// return the products with at least one matching tag (excluding the current product)
		const similarProducts = tags.reduce(
			(acc, tag) => {
				const similar = products.filter(
					(p) => p.id !== product.id && p.tags.includes(tag)
				);
				return [...acc, ...similar];
			},
			[] as typeof products
		);

		return Array.from(new Set(similarProducts));
	};

	const PAGE_WIDTH = Dimensions.get("window").width;

	return (
		<ScrollView className="flex-1 bg-white">
			{/* Back Button */}
			<TouchableOpacity className="px-4 py-2 mt-4">
				<Icon name="arrow-back-ios" size={24} color="#4A4A4A" />
			</TouchableOpacity>

			{/* Image Carousel */}
			<Carousel
				loop
				autoPlay
				scrollAnimationDuration={1200}
				width={PAGE_WIDTH}
				height={240}
				data={images}
				mode="parallax"
				renderItem={({ item }) => (
					<Image
						source={typeof item === "string" ? { uri: item } : item}
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
						{discountedPrice} {currency}
					</Text>
					{discountedPrice !== price && (
						<Text className="text-sm text-gray-400 line-through">
							{price} {currency}
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
