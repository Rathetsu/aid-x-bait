import {
	StreamVideo,
	StreamVideoClient,
	User,
} from "@stream-io/video-react-native-sdk";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/store";

// const streamApiKey = process.env.EXPO_PUBLIC_STREAM_PUBLIC_KEY;
const streamApiKey = "mmhfdzb5evj2";
const userId = "Kyp_Durron";
// const tokenValidity = 24 * 60 * 60; // 24 hours
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0t5cF9EdXJyb24iLCJ1c2VyX2lkIjoiS3lwX0R1cnJvbiIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzM3NjQyMzc2LCJleHAiOjE3MzgyNDcxNzZ9.WgdZCmmPg0UbrAUALuxdUYATXVDOsKLBzhBw85JmYEM";

const user: User = { id: userId };

export const streamClient = StreamVideoClient.getOrCreateInstance({
	apiKey: streamApiKey,
	token,
	user,
});

const getHeader = (name: string) => {
	switch (name) {
		default:
			return null;
	}
};

const Layout = () => {
	return (
		<Provider store={store}>
			<StreamVideo client={streamClient}>
				<Stack
					screenOptions={{
						header: ({ route }) => getHeader(route.name),
					}}
				>
					<Stack.Screen
						name="appointment-search"
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="video-call" options={{ headerShown: false }} />
				</Stack>
			</StreamVideo>
		</Provider>
	);
};

export default Layout;
