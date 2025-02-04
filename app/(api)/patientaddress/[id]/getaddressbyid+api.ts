import { fetchAPI } from "@/lib/fetch";
import { AddressResponseDto } from "@/types/type";

const getAddressById = async (id: number): Promise<AddressResponseDto> => {
  try {
    const response = await fetchAPI(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/address/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Fetched address by ID successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching address by ID:", error);
    throw new Error("Failed to fetch address by ID");
  }
};

export default getAddressById;