import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

export async function getHashtags() {
  try {
    const response = await axiosInstanceWithToken.get(`/api/hashtag/names`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getHashtag(hashtag: string) {
  try {
    const response = await axiosInstanceWithToken.post(
      `/api/hashtag/name/${hashtag}`,
    );
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
}
