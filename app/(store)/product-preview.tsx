import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

import ProductPreview from "@/components/ProductPreview";

const ProductPreviewPage = () => {
	// Get query parameters from the URL
	const params = useLocalSearchParams();

	const product = JSON.parse(params.product);
	const forRent = params.forRent === "true";
	const freeShipping = params.freeShipping === "true";

	return (
		<View className="flex-1">
			<ProductPreview
				product={product}
				forRent={forRent}
				freeShipping={freeShipping}
			/>
		</View>
	);
};

export default ProductPreviewPage;
