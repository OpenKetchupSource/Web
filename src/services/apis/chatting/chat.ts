import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

// 이건 안 쓸 듯
export async function postSetting(memberId: string, characterId: string) {
  try {
    const response = await axiosInstanceWithToken.post(
      "/api/setting/initialize",
      {
        memberId,
        characterId,
      },
    );
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
}

export async function postCharacter(characterName: string) {
  try {
    const response = await axiosInstanceWithToken.post(
      `/api/chat/start`,
      {},
      {
        params: {
          character: characterName,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postComment(
  chatId: string,
  character: string,
  content: string,
) {
  try {
    const response = await axiosInstanceWithToken.post(
      `/api/chat/${chatId}/reply`,
      { role: "user", content: content },
      {
        params: {
          character: character,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
