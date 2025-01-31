import { fetchAPI } from "@/lib/fetch";
import { CreateUserData, CreateUserResponse } from "@/types/type";

const createUser = async (
	userData: CreateUserData
): Promise<CreateUserResponse> => {
	try {
		const response = await fetchAPI(
			`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/create`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${userData.clerkId}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);

		console.log("User created successfully:", response);
		return response;
	} catch (error) {
		console.error("Error creating user:", error);
		throw new Error("Failed to create user");
	}
};

export default createUser;
