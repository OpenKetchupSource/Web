import { useState } from "react";
import { sendMessageToGPT } from "../services/gpt/openai";

const Testpage = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const result = await sendMessageToGPT(input);
    setResponse(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GPT와 대화하기</h1>
      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <br />
      <button onClick={handleSubmit}>전송</button>
      <h3>GPT 응답:</h3>
      <p>{response}</p>
    </div>
  );
};

export default Testpage;
