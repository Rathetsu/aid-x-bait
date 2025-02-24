import { router } from "expo-router";
import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import HorizontalProductList from "@/components/HorizontalProductList";
import { images as importedImages } from "@/constants";
import { ProductPreviewProps } from "@/types/type";

const ProductPreview = ({
	product,
	forRent,
	freeShipping,
}: ProductPreviewProps) => {
	const [quantity, setQuantity] = useState(1);
	const [cartCount, setCartCount] = useState(0);
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
				tags: ["lumbar", "knee", "belt"],
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

	const handleAddToCart = () => {
		setCartCount(cartCount + quantity);
	};

	const PAGE_WIDTH = Dimensions.get("window").width;

	return (
		<View className="flex-1 bg-white">
			{/* Carousel Section */}
			<View className="absolute top-0 w-full z-10">
				<Carousel
					loop
					width={PAGE_WIDTH}
					height={PAGE_WIDTH * 0.75}
					data={images}
					renderItem={({ item }) => (
						<Image
							source={typeof item === "string" ? { uri: item } : item}
							className="w-full h-full"
							resizeMode="cover"
						/>
					)}
				/>
				<TouchableOpacity
					className="absolute top-10 left-4 bg-white p-2 rounded-full"
					onPress={() => router.back()}
				>
					<MaterialIcons name="arrow-back-ios" size={20} color="#4A4A4A" />
				</TouchableOpacity>
			</View>

			{/* Scrollable Content */}
			<ScrollView
				className="flex-1 px-4 pt-[80%]" // Padding to avoid overlapping with Carousel
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				{/* Product Title, Rating and Quantity selector */}
				<View className="flex-row">
					<View className="flex-1">
						{" "}
						<Text className="text-lg font-JakartaBold text-gray-900">
							{name} {forRent ? "For Rent" : ""}
						</Text>
						<View className="flex-row items-center mt-1">
							<Text className="text-sm text-gray-600">({rating.count})</Text>
							<MaterialIcons
								name="star"
								size={16}
								color="#FFD700"
								className="ml-1"
							/>
							<Text className="text-sm ml-2 font-JakartaMedium">
								{rating.value}
							</Text>
						</View>
					</View>

					{/* Quantity Selector */}
					<View className="flex-row items-center">
						<TouchableOpacity
							className="px-3 py-2 bg-gray-200 rounded-l"
							onPress={() => setQuantity(Math.max(1, quantity - 1))}
						>
							<Text className="text-lg font-JakartaBold text-gray-600">-</Text>
						</TouchableOpacity>
						<View className="px-4 py-2 bg-gray-100">
							<Text className="text-lg font-JakartaMedium">{quantity}</Text>
						</View>
						<TouchableOpacity
							className="px-3 py-2 bg-gray-200 rounded-r"
							onPress={() => setQuantity(quantity + 1)}
						>
							<Text className="text-lg font-JakartaBold text-gray-600">+</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View className="flex-row items-center justify-between mt-4">
					{/* Pricing */}
					<View>
						<Text className="text-xl font-JakartaBold text-orange-500">
							{discountedPrice} {currency}
						</Text>
						{discountedPrice !== price && (
							<Text className="text-sm text-gray-400 line-through">
								{price} {currency}
							</Text>
						)}
					</View>

					{/* Percentage Off */}
					{discountedPrice !== price ? (
						<View className="bg-primary-100 px-3 py-1 rounded-md">
							<Text className="text-primary-600 text-sm font-JakartaSemiBold">
								{Math.round(((price - discountedPrice) / price) * 100)}% OFF
							</Text>
						</View>
					) : null}
				</View>

				{/* Rent Term & Free Shipping */}
				<View className="flex-row gap-x-3 mt-4">
					{/* Duration */}
					{forRent && (
						<View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-md">
							<MaterialIcons name="event" size={16} color="#4A4A4A" />
							<Text className="ml-2 text-sm text-gray-700">{`Duration: ${rentTerm}`}</Text>
						</View>
					)}
					{/* Free Shipping */}
					{freeShipping && (
						<View className="flex-row items-center bg-orange-100 px-4 py-2 rounded-md">
							<MaterialIcons name="local-shipping" size={16} color="#F97316" />
							<Text className="ml-2 text-sm text-orange-600">
								Free Shipping
							</Text>
						</View>
					)}
				</View>

				{/* Product Details */}
				<View className="mt-6">
					<Text className="text-base font-JakartaMedium text-gray-800">
						Product Details
					</Text>
					<Text className="text-sm text-gray-600 mt-2">
						{product.description}
					</Text>
				</View>

				{/* How To Use Section */}
				<TouchableOpacity className="flex-row justify-between items-center mt-4 bg-gray-100 px-4 py-3 rounded-lg">
					<Text className="text-sm font-JakartaMedium text-gray-800">
						How To Use It
					</Text>
					<MaterialIcons name="arrow-forward-ios" size={16} color="#4A4A4A" />
				</TouchableOpacity>

				{/* Similar Products */}
				<HorizontalProductList
					title={forRent ? "Rent More" : "Similar Products"}
					products={getSimilarProducts()}
				/>
			</ScrollView>

			{/* Sticky Footer */}
			<View className="absolute bottom-0 w-full bg-white px-4 py-3 flex-row items-center justify-center shadow-md">
				{/* Cart Icon */}
				<TouchableOpacity
					className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center shadow"
					onPress={() => router.replace("/(store)/cart")}
				>
					<MaterialIcons name="shopping-cart" size={20} color="#4A4A4A" />
					{cartCount > 0 && (
						<View className="absolute -top-1 -right-1 bg-blue-500 w-5 h-5 rounded-full items-center justify-center">
							<Text className="text-[10px] text-white font-JakartaBold">
								{cartCount}
							</Text>
						</View>
					)}
				</TouchableOpacity>

				{/* Buy Now Button */}
				<TouchableOpacity
					className="flex w-[70vw] ml-4 bg-primary-500 py-3 rounded-md flex-row justify-center items-center"
					onPress={handleAddToCart}
				>
					<Text className="text-white font-JakartaMedium text-base mr-2">
						{forRent ? "Rent Now" : "Buy Now"}
					</Text>
					{/* arrow icon */}
					<AntDesign
						name="rightcircle"
						size={20}
						color="#fff"
						className="ml-4"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProductPreview;
