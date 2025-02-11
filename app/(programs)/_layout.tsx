import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="video-gallery" options={{ headerShown: false }} />
			<Stack.Screen name="watch-video" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
