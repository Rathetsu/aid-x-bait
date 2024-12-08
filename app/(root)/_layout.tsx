import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="aidxbait-store" options={{ headerShown: false }} />
			<Stack.Screen name="exercise-programs" options={{ headerShown: false }} />
			<Stack.Screen name="home-visits" options={{ headerShown: false }} />
			<Stack.Screen
				name="online-consultations"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
};

export default Layout;
