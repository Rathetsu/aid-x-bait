import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="vide-gallery" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
