import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import ProductPreview from "@/components/ProductPreview";

const ProductPreviewPage = () => {
	const params = useLocalSearchParams();
	const productParam = Array.isArray(params.product)
		? params.product[0]
		: params.product;
	const product = productParam ? JSON.parse(productParam) : null;
	const forRent = params.forRent === "true";
	const freeShipping = params.freeShipping === "true";

	return (
		<>
			{false ? (
				<ProductPreview
					product={product}
					forRent={forRent}
					freeShipping={freeShipping}
				/>
			) : (
				<View className="flex-1 items-center justify-center">
					<Text>Product data is not available.</Text>
				</View>
			)}
		</>
	);
};

export default ProductPreviewPage;
