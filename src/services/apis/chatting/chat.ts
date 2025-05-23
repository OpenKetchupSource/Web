import { CreateAxiosInstanceWithToken } from '../axiosInstanceWithToken';

const axiosInstanceWithToken = CreateAxiosInstanceWithToken();

export async function postSetting(id: string, pw: string) {
  try {
    const response = await axiosInstanceWithToken.post('/api/setting/initialize');
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
}
