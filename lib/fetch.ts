import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`HTTP error! Status: ${response.status}, Message: ${response.statusText}, Body: ${errorBody}`
			);
		}
		const res = await response.json();
		console.log(`Res (URL: ${url})`, res);
		return res;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await fetchAPI(url, options);
			setData(result.data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
};
