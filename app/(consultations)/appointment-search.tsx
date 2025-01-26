import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "@/components/SearchInput";

const ProductSearchPage = () => {
	const handleSearch = (query: string) => {
		// Handle search
	};

	return (
		<SafeAreaView className="flex-row items-center justify-between px-3 pr-6 pt-2 bg-white border-b border-gray-200 h-auto">
			{/* Back Button */}
			<TouchableOpacity onPress={() => router.back()} className="pr-2">
				<Ionicons name="chevron-back" size={25} color="#636363" />
			</TouchableOpacity>
			{/* Search Input */}
			<SearchInput
				onSearch={handleSearch}
				placeholder="Search your appointments..."
				inputProps={{
					autoCapitalize: "none",
					keyboardType: "default",
				}}
			/>
		</SafeAreaView>
	);
};

export default ProductSearchPage;
