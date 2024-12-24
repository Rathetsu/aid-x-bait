import { ScrollView } from "react-native";

import HorizontalProductList from "@/components/HorizontalProductList";
import InjurySelector from "@/components/InjurySelector";
import ProductGrid from "@/components/ProductGrid";
import ScrollableBanner from "@/components/ScrollableBanner";
import { images } from "@/constants";

const productArray = [
	{
		id: 1,
		title: "Adjustable Knee Brace",
		originalPrice: "250",
		discountedPrice: "200",
		image: images.kneebrace,
		images: [images.kneebrace],
		isBestSeller: false,
		rating: {
			value: 4.3,
			count: 3,
		},
		description:
			"This is a high-quality knee brace designed for superior support during physical therapy.",
		duration: "3 Months",
		tags: ["Knee", "Brace", "Adjustable"],
	},
	{
		id: 2,
		title: "Compression Shoulder Brace",
		originalPrice: "200 L.E",
		discountedPrice: "180 L.E",
		image: images.shoulderbrace,
		images: [images.shoulderbrace],
		isBestSeller: false,
		rating: {
			value: 4.8,
			count: 5,
		},
		description:
			"Designed to provide support and stability for shoulder injuries and pain.",
		duration: "Per day",
		tags: ["Shoulder", "Brace", "Compression"],
	},
	{
		id: 3,
		title: "Lumbar Support Belt",
		originalPrice: "300 L.E",
		discountedPrice: "250 L.E",
		image: images.lumbarbelt,
		images: [images.lumbarbelt],
		isBestSeller: true,
		rating: {
			value: 4.5,
			count: 2,
		},
		description:
			"High-quality lumbar support belt designed to provide relief for lower back pain.",
		duration: "1 Month",
		tags: ["Lumbar", "Support", "Belt"],
	},
	{
		id: 4,
		title: "Therapeutic Wrist Wrap",
		originalPrice: "200 L.E",
		discountedPrice: "180 L.E",
		image: images.wristwrap,
		images: [images.wristwrap],
		isBestSeller: false,
		rating: {
			value: 4.2,
			count: 3,
		},
		description:
			"Designed to provide support and relief for wrist injuries and pain.",
		duration: "Per day",
		tags: ["Wrist", "Wrap", "Therapeutic"],
	},
];

const AidxbaitStore = () => {
	return (
		<ScrollView
			className="flex-1"
			contentContainerStyle={{ paddingBottom: 20 }}
		>
			<ScrollableBanner />

			<InjurySelector />

			<ProductGrid title="New Arrivals" products={productArray} />
			<HorizontalProductList title="For Rent" products={productArray} />
			<ProductGrid title="Best Sellers" products={productArray} />
		</ScrollView>
	);
};

export default AidxbaitStore;
