import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, OAuthProvider, Storage } from "react-native-appwrite";

export const config = {
	platform: "com.aidxbait.aidxbait",
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
	.setEndpoint(config.endpoint!)
	.setProject(config.project!)
	.setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const storage = new Storage(client);

export async function googleLogin() {
	try {
		const redirectUri = Linking.createURL("/");
		const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
		if (!response) throw new Error("Failed to login");
		const browserResponse = await openAuthSessionAsync(response.toString(), redirectUri);
		if (browserResponse.type !== "success") throw new Error("Create OAuth2 token failed");

		const url = new URL(browserResponse.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export async function googleLogout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}