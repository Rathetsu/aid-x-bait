import { fetchAPI } from "@/lib/fetch";
import { UpdateAddressRequestDto, AddressResponseDto } from "@/types/type";

const updateAddress = async (
  id: number,
  addressData: UpdateAddressRequestDto
): Promise<AddressResponseDto> => {
  try {
    const response = await fetchAPI(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/address/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${addressData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      }
    );
    console.log("Updated address successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating address:", error);
    throw new Error("Failed to update address");
  }
};

export default updateAddress;