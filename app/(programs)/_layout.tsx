import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="program-gallery" options={{ headerShown: false }} />
			<Stack.Screen name="program-videos" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
