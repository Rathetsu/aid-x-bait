const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface CreateUserDto {
	createDto: {
		first_name: string;
		last_name: string;
		email: string;
		clerk_id: string;
		image_url: string;
		phone_number: string;
	};
	user_type: string;
}

export async function getUser(identifier: number | string, token: string) {
	const URL = `${BACKEND_URL}/users/get-user-details`;
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ identifier }),
		});

		if (!response.ok) {
			console.log("response: ", response);
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching user:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function createUser(userData: CreateUserDto, token: string) {
	const URL = `${BACKEND_URL}/users/create`;
	try {
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
