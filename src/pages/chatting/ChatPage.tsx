import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { postComment, postDiary } from '../../services/apis/chatting/chat';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ChatBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 400px;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
`;

const Message = styled.div<{ role: string }>`
  text-align: ${({ role }) => (role === 'user' ? 'right' : 'left')};
  margin-bottom: 0.5rem;
`;

const Bubble = styled.span<{ role: string }>`
  display: inline-block;
  background-color: ${({ role }) => (role === 'user' ? '#d0e8ff' : '#d6f5d6')};
  padding: 0.5rem 0.75rem;
  border-radius: 16px;
  max-width: 70%;
  word-break: break-word;
`;

const InputArea = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: #a0c4f6;
  }
`;

const ChatPage = () => {
  const { chatId, character } = useParams<{ chatId: string; character: string }>();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading || !chatId || !character) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await postComment(chatId, character, userMessage.content);
      setMessages((prev) => [...prev, { role: 'bot', content: reply.content }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const endChatting = () => {
    // postDiary(chatId, character, date)
  };

  return (
    <Container>
      <Title>Chat with {character}</Title>
      <ChatBox>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role}>
            <Bubble role={msg.role}>{msg.content}</Bubble>
          </Message>
        ))}
        {loading && <div>응답 중...</div>}
      </ChatBox>
      <InputArea>
        <TextInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
        />
        <SendButton onClick={handleSend} disabled={loading}>
          보내기
        </SendButton>
      </InputArea>
      <button onClick={endChatting}>대화 종료하기</button>
    </Container>
  );
};

export default ChatPage;
