import { FlatList, View } from "react-native";

import HorizontalProductList from "@/components/HorizontalProductList";
import InjurySelector from "@/components/InjurySelector";
import ProductGrid from "@/components/ProductGrid";
import ScrollableBanner from "@/components/ScrollableBanner";
import { images } from "@/constants";

const productArray = [
	{
		id: 1,
		name: "Adjustable Knee Brace",
		description:
			"This is a high-quality knee brace designed for superior support during physical therapy.",
		price: 250,
		discountedPrice: 200,
		currency: "L.E",
		stock: 15,
		image: images.kneebrace,
		images: [images.kneebrace, images.shoulderbrace],
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
		image: images.shoulderbrace,
		images: [images.shoulderbrace],
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
		image: images.lumbarbelt,
		images: [images.lumbarbelt],
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
		image: images.wristwrap,
		images: [images.wristwrap],
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

const sections = [
	{ id: "banner", component: <ScrollableBanner /> },
	{ id: "injurySelector", component: <InjurySelector /> },
	{
		id: "newArrivals",
		component: <ProductGrid title="New Arrivals" products={productArray} />,
	},
	{
		id: "forRent",
		component: (
			<HorizontalProductList title="For Rent" products={productArray} />
		),
	},
	{
		id: "bestSellers",
		component: <ProductGrid title="Best Sellers" products={productArray} />,
	},
];

const AidxbaitStore = () => {
	return (
		<View className="flex-1 pb-10">
			<FlatList
				data={sections}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => item.component}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default AidxbaitStore;
