import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="my-addresses" options={{ headerShown: false }} />
			<Stack.Screen name="new-address" options={{ headerShown: false }} />
			<Stack.Screen name="edit-address/[id]" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
