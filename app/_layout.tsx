import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { LogBox } from "react-native";
import "../global.css";
import { Provider } from "react-redux";

import { tokenCache } from "@/lib/auth";
import { store } from "@/store";
import { loadUserFromStorage } from "@/store/slices/userSlice";

SplashScreen.preventAutoHideAsync();

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!clerkPublishableKey) {
	throw new Error(
		"Missing Clerk Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
	);
}

LogBox.ignoreLogs(["Clerk:"]);

export default function RootLayout() {
	const [loaded] = useFonts({
		"Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
		"Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
		"Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
		"Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
		"Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
		Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
		"Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
	});

	// Load user data from AsyncStorage on app startup
	useEffect(() => {
		store.dispatch(loadUserFromStorage());
	}, []);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<ClerkProvider
				tokenCache={tokenCache}
				publishableKey={clerkPublishableKey}
			>
				<ClerkLoaded>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(root)" options={{ headerShown: false }} />
						<Stack.Screen name="(self)" options={{ headerShown: false }} />
						<Stack.Screen name="(store)" options={{ headerShown: false }} />
						<Stack.Screen name="(programs)" options={{ headerShown: false }} />
						<Stack.Screen
							name="(consultations)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
				</ClerkLoaded>
			</ClerkProvider>
		</Provider>
	);
}
