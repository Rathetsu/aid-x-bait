import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	TextInputProps,
} from "react-native";

interface SearchInputProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	inputProps?: TextInputProps;
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
	let timeoutId: NodeJS.Timeout;
	return (...args: any[]) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

const SearchInput: React.FC<SearchInputProps> = ({
	onSearch,
	placeholder = "Search for products...",
	inputProps,
}) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const onChangeText = (text: string) => {
		setSearchTerm(text);
		const debouncedSearch = debounce((query: string) => {
			onSearch(query);
		}, 300);

		debouncedSearch(text);
	};

	return (
		<View className="flex-row items-center bg-gray-100 rounded-md px-4 py-2 shadow-md w-[80vw]">
			<TextInput
				value={searchTerm}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="#A0A0A0"
				className="flex-1 text-base text-gray-600 h-10"
				{...inputProps}
			/>
			<TouchableOpacity>
				<Ionicons name="search-outline" size={20} color="#A0A0A0" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
