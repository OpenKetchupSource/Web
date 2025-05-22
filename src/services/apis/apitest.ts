import axiosInstance from "./axiosInstance";

export async function getTest() {
  try {
    const response = await axiosInstance.get("/api/test");
    return response.data;
  } catch (error) {
    console.error("Error fetching short notices:", error);
    throw error;
  }
}
