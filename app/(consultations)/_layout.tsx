// import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/store";

const getHeader = (name: string) => {
	switch (name) {
		default:
			return null;
	}
};

const Layout = () => {
	// const { user } = useUser();
	// const clerkId = user?.id;

	return (
		<Provider store={store}>
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
		</Provider>
	);
};

export default Layout;
