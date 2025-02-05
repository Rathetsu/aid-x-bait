const URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/patient-address/delete`;

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
		return new Response(null, { status: response.status });
	} catch (error) {
		console.error("Error deleting user address:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
