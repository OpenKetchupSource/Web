import axiosInstance from "../axiosInstance";

export async function getDiary(
  diaryId: string,
) {
    console.log("Fetching diary with ID:", diaryId);
  try {
    const response = await axiosInstance.get(
      `/api/diary/get/${diaryId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
