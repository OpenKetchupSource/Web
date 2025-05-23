import { CreateAxiosInstanceWithToken } from "../axiosInstanceWithToken";

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

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
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
