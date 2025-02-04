import { fetchAPI } from "@/lib/fetch";
import { SoftDeleteUserAddressRequestDto } from "@/types/type";

const softDeletePatientAddress = async (
  params: SoftDeleteUserAddressRequestDto,
  token: string
): Promise<void> => {
  try {
    await fetchAPI(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/patient-address/${params.addressId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Soft deleted patient address successfully");
  } catch (error) {
    console.error("Error soft deleting patient address:", error);
    throw new Error("Failed to soft delete patient address");
  }
};

export default softDeletePatientAddress;