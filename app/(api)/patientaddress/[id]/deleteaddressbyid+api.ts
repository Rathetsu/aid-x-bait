import { fetchAPI } from "@/lib/fetch";

const deleteAddress = async (id: number, token: string): Promise<void> => {
  try {
    await fetchAPI(`${process.env.EXPO_PUBLIC_BACKEND_URL}/address/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Deleted address successfully");
  } catch (error) {
    console.error("Error deleting address:", error);
    throw new Error("Failed to delete address");
  }
};

export default deleteAddress;