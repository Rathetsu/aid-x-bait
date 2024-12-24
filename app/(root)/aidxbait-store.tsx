import { ScrollView } from "react-native";

import InjurySelector from "@/components/InjurySelector";
import ProductGrid from "@/components/ProductGrid";
import ScrollableBanner from "@/components/ScrollableBanner";

const productArray = [
	{
		id: 1,
		title: "Adjustable Knee Brace",
		price: "150 L.E",
		image: "https://i.imgur.com/6b7L9Zq.jpg",
		isBestSeller: false,
	},
	{
		id: 2,
		title: "Compression Elbow Sleeve",
		price: "180 L.E",
		image: "https://i.imgur.com/6b7L9Zq.jpg",
		isBestSeller: false,
	},
	{
		id: 3,
		title: "Lumbar Support Belt",
		price: "150 L.E",
		image: "https://i.imgur.com/6b7L9Zq.jpg",
		isBestSeller: true,
	},
	{
		id: 4,
		title: "Therapeutic Wrist Wrap",
		price: "180 L.E",
		image: "https://i.imgur.com/6b7L9Zq.jpg",
		isBestSeller: false,
	},
];

const AidxbaitStore = () => {
	return (
		<ScrollView className="flex-1">
			<ScrollableBanner />
			<InjurySelector />
			<ProductGrid title="New Arrivals" products={productArray} />
		</ScrollView>
	);
};

export default AidxbaitStore;
