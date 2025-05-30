import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

export async function getAllDiary() {
  try {
    const response = await axiosInstanceWithToken.get(`/api/diary/get`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDiary(diaryId: string) {
  try {
    const response = await axiosInstanceWithToken.get(
      `/api/diary/get/${diaryId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
