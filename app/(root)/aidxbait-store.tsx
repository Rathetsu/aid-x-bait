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
		price: "150 L.E",
		image: images.kneebrace,
		isBestSeller: false,
		duration: "1 Week",
	},
	{
		id: 2,
		title: "Compression Shoulder Brace",
		price: "180 L.E",
		image: images.shoulderbrace,
		isBestSeller: false,
		duration: "Per day",
	},
	{
		id: 3,
		title: "Lumbar Support Belt",
		price: "150 L.E",
		image: images.lumbarbelt,
		isBestSeller: true,
		duration: "1 Month",
	},
	{
		id: 4,
		title: "Therapeutic Wrist Wrap",
		price: "180 L.E",
		image: images.wristwrap,
		isBestSeller: false,
		duration: "Per day",
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
