import { fetchAPI } from "@/lib/fetch";
import { GetUserAddressesResponseDto } from "@/types/type";

const getPatientAddresses = async (
  patientId: number
): Promise<GetUserAddressesResponseDto[]> => {
  try {
    const response = await fetchAPI(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/patient-address/${patientId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Fetched patient addresses successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching patient addresses:", error);
    throw new Error("Failed to fetch patient addresses");
  }
};

export default getPatientAddresses;