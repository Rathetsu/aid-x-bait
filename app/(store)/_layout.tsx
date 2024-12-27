import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/store";

const Layout = () => {
	return (
		<Provider store={store}>
			<Stack>
				<Stack.Screen name="cart" options={{ headerShown: false }} />
				<Stack.Screen name="product-preview" options={{ headerShown: false }} />
				<Stack.Screen name="product-search" options={{ headerShown: false }} />
			</Stack>
		</Provider>
	);
};

export default Layout;
