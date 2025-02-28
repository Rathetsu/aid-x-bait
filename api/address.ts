const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface CreateAddressDto {
	patient_id: number;
	address_type: string;
	address_label: string;
	governorate: string;
	city: string;
	street: string;
	building_name?: string;
	floor?: string;
	apartment?: string;
	additional_directions?: string;
	phone?: string;
	is_primary?: boolean;
}

interface DeleteAddressDto {
	address_id: number;
}

interface UpdateAddressDto {
	address_id: number;
	address_type?: string;
	address_label?: string;
	governorate?: string;
	city?: string;
	street?: string;
	building_name?: string;
	floor?: string;
	apartment?: string;
	additional_directions?: string;
	phone?: string;
	is_primary?: boolean;
}

export async function getAddresses(patientId: number, token: string) {
	const URL = `${BACKEND_URL}/patient-address/get`;
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ patientId }),
		});

		if (!response.ok) {
			console.log("response: ", response);
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function createAddress(
	addressData: CreateAddressDto,
	token: string
) {
	const URL = `${BACKEND_URL}/patient-address/create`;
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(addressData),
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
		console.error("Error creating address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function setPrimaryAddress(
	addressId: number,
	token: string,
	isPrimary: boolean
) {
	const URL = `${BACKEND_URL}/patient-address/update`;
	const updateData = {
		address_id: addressId,
		is_primary: isPrimary,
	};
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(updateData),
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
		console.error("Error setting primary address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function updateAddress(
	updateData: UpdateAddressDto,
	token: string
) {
	const URL = `${BACKEND_URL}/patient-address/update`;
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(updateData),
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
		console.error("Error updating address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function deleteAddress(
	deleteData: DeleteAddressDto,
	token: string
) {
	const URL = `${BACKEND_URL}/patient-address/delete`;
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(deleteData),
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
		console.error("Error deleting address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
