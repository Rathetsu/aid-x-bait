import { tokenCache } from "@/lib/auth";
const URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/create`;

interface UserDataDto {
	createDto: {
		first_name: string;
		last_name: string;
		email: string;
		clerk_id: string;
		phone_number: string;
	};
	user_type: string;
}

export async function createUser(userData: UserDataDto) {
	try {
		const token = await tokenCache.getToken("__clerk_client_jwt");
		console.log("Token: ", token);
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userData),
		});
		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`HTTP error! Status: ${response.status}, Message: ${response.statusText}, Body: ${errorBody}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error creating user:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
