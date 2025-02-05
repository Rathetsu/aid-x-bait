const URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/patient-address/update`;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();
		return Response.json(data, { status: response.status });
	} catch (error) {
		console.error("Error updating user address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
