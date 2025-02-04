import { fetchAPI } from "@/lib/fetch";
import { AddressResponseDto } from "@/types/type";

const getAddress = async (): Promise<AddressResponseDto[]> => {
  try {
    const response = await fetchAPI(`${process.env.EXPO_PUBLIC_BACKEND_URL}/address`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Fetched addresses successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw new Error("Failed to fetch addresses");
  }
};

export default getAddress;