import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as SecureStore from "expo-secure-store";

const createTokenCache = (): TokenCache => {
	return {
		getToken: async (key: string) => {
			try {
				const item = await SecureStore.getItemAsync(key);
				if (item) {
					console.log(`${key} was used 🔐 \n`);
				} else {
					console.log("No values stored under key: " + key);
				}
				return item;
			} catch (error) {
				console.error("secure store get item error: ", error);
				await SecureStore.deleteItemAsync(key);
				return null;
			}
		},
		saveToken: (key: string, token: string) => {
			try {
				return SecureStore.setItemAsync(key, token);
			} catch (err) {
				console.error("SecureStore set item error: ", err);
				return Promise.reject(err);
			}
		},
	};
};

export const tokenCache = createTokenCache();
