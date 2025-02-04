import { fetchAPI } from "@/lib/fetch";
import { InsertUserAddressRequestDto, GetUserAddressesResponseDto } from "@/types/type";

const insertPatientAddress = async (
  addressData: InsertUserAddressRequestDto
): Promise<GetUserAddressesResponseDto> => {
  try {
    const response = await fetchAPI(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/patient-address`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${addressData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      }
    );
    console.log("Inserted patient address successfully:", response);
    return response;
  } catch (error) {
    console.error("Error inserting patient address:", error);
    throw new Error("Failed to insert patient address");
  }
};

export default insertPatientAddress;