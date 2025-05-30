import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

export async function postWritingDiary(diaryData: {
  date: string;
  title: string;
  content: string;
  hashtag: string;
  character: string;
}) {
  try {
    const response = await axiosInstanceWithToken.post(
      `/api/diary/create`,
      diaryData,
    );
    return response;
  } catch (error) {
    throw error;
  }
}
