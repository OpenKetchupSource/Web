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

export async function delDiary(diaryId: string) {
  try {
    const response = await axiosInstanceWithToken.delete(
      `/api/diary/delete/${diaryId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function putDiary(
  diaryId: string,
  data: {
    date: string;
    title: string;
    content: string;
    hashtag: string;
  },
) {
  try {
    const response = await axiosInstanceWithToken.put(
      `/api/diary/update/${diaryId}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postComment(
  diaryId: string,
  comment: string,
  characterId: number | string,
) {
  try {
    const response = await axiosInstanceWithToken.post(
      `/api/comment/diary?diaryId=${diaryId}`,
      {
        comment,
        characterId,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
