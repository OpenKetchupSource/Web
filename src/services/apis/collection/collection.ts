import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

export async function postComment(commentId: string) {
  try {
    const response = await axiosInstanceWithToken.post(`/api/comment/bookmark?commentId=${commentId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getComments(characterId: string) {
  try {
    const response = await axiosInstanceWithToken.get(`/api/comment/bookmark/get?characterId=${characterId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
