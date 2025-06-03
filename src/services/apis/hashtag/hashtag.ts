import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

export async function getHashtags() {
  try {
    const response = await axiosInstanceWithToken.get(
      `/api/hashtag/names`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
