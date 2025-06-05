import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToGPT = async (message: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GPT API 호출 오류:", error);
    throw error;
  }
};

/**
 * GPT에게 일기 내용을 기반으로 따뜻한 코멘트를 요청합니다.
 * @param content 일기 내용
 * @param title 일기 제목
 * @returns GPT가 생성한 AI 코멘트 문자열
 */
export const generateOongAIComment = async (
  content: string,
  title: string,
  hashtags: string,
): Promise<string> => {
  const prompt = `
너는 따뜻하고 공감 능력이 뛰어난 AI 친구야. 사용자가 작성한 아래의 일기를 읽고,
부드럽고 진심 어린 말투 반말로 짧은 코멘트를 작성해줘.

제목: ${title}
내용: ${content}
해시태그: ${hashtags}

AI 코멘트:
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("GPT API 호출 오류:", error);
    throw new Error("AI 코멘트를 생성하는 데 실패했습니다.");
  }
};

export const generateAngAIComment = async (
  content: string,
  title: string,
  hashtags: string,
): Promise<string> => {
  const prompt = `
너는 화가 많고 공감 능력이 뛰어난 AI 친구야. 사용자가 작성한 아래의 일기를 읽고,
속상한 사용자를 위해 같이 화를 내줘.

제목: ${title}
내용: ${content}
해시태그: ${hashtags}

AI 코멘트:
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("GPT API 호출 오류:", error);
    throw new Error("AI 코멘트를 생성하는 데 실패했습니다.");
  }
};

export const generateTeeAIComment = async (
  content: string,
  title: string,
  hashtags: string,
): Promise<string> => {
  const prompt = `
너는 냉철한 AI 친구야. 사용자가 작성한 아래의 일기를 읽고,
해결 방법을 제시해줘.

제목: ${title}
내용: ${content}
해시태그: ${hashtags}

AI 코멘트:
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("GPT API 호출 오류:", error);
    throw new Error("AI 코멘트를 생성하는 데 실패했습니다.");
  }
};
