import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postComment, postDiary } from "../../services/apis/chatting/chat";
import { useSettingStore } from "../../services/zustand/setting";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  align-items: center;
`;

const HomeIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 27%;
  img {
    width: 30px;
    height: 30px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 1rem;
  margin-top: 0;
  color: #364b76;
  text-align: center;
`;

const TitleWrapper = styled.div`
  position: relative;
  text-align: center;
  justify-content: space-between;
  padding: 16px 40px; // 여백 필요 시 조정
`;

const EndChatButton = styled.button`
  position: absolute;
  right: 16px;
  top: 27%;
  background-color: unset;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;

const ChatBox = styled.div`
  border-radius: 8px;
  height: 700px;
  padding: 1rem;
  overflow-y: auto;
  background-color: unset;
  margin-bottom: 0rem;

  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0.1)
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0.1)
  );

  /* 스크롤바 숨기기 (크로스브라우징 대응) */

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;

  /* IE, Edge 구버전 */
  -ms-overflow-style: none;
`;

const Message = styled.div<{ role: string }>`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.2rem;

  ${({ role }) =>
    role === "user"
      ? `
        text-align: right;
        flex-direction: row-reverse;
      `
      : `
        margin-left: -0.5rem;
        text-align: left;
        flex-direction: row;
      `}
  }

`;

const Bubble = styled.span<{ role: string }>`
  position: relative;
  display: inline-block;
  background-color: #fff8f8;
  color: #364b76;
  padding: 0.8rem 1rem;
  border-radius: 16px;
  max-width: 70%;
  word-break: break-word;
  align-self: ${({ role }) => (role === "user" ? "flex-end" : "flex-start")};

  &::after {
    content: "";
    position: absolute;
    top: 20px;

    ${({ role }) =>
      role === "user"
        ? `
        right: -10px;
        border-width: 6px 0 6px 12px;
        border-style: solid;
        border-color: transparent transparent transparent #FFF8F8;
      `
        : `
        left: -10px;
        border-width: 6px 12px 6px 0;
        border-style: solid;
        border-color: transparent #FFF8F8 transparent transparent;
      `}
  }
`;

const InputArea = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  align-items: center;
  background-color: #fff8f8;
  padding: 0.75rem 0.5rem 0.75rem 1.25rem;
  height: 50px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const TextInput = styled.input`
  flex: 1;
  font-size: 1.3rem;
  color: #5e6b7c;
  border: none;
  background: transparent;
  outline: none;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 48px;
    height: 48px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 0.9rem;
  font-weight: normal;
  color: #364b76;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
`;

const ChatPage = () => {
  const { chatId = "", character = "" } = useParams();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedDate } = useSettingStore();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || !chatId || !character) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await postComment(chatId, character, userMessage.content);

      if (reply?.content) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: reply.content },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "응답을 받지 못했습니다. 다시 시도해 주세요.",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "에러가 발생했습니다. 나중에 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const endChatting = async () => {
    if (!chatId || !character || !selectedDate) {
      alert("채팅 ID, 캐릭터 또는 날짜 정보가 부족합니다.");
      return;
    }

    try {
      const formattedDate =
        selectedDate instanceof Date
          ? selectedDate.toISOString().split("T")[0]
          : selectedDate;

      const response = await postDiary(chatId, character, formattedDate);
      alert("대화가 저장되었습니다.");

      if (response?.diaryId) {
        navigate(`/diary/${response.diaryId}`);
      }
    } catch (err) {
      console.error("대화 저장 실패:", err);
      alert("대화 저장 중 문제가 발생했습니다.");
    }
  };

  const getImageFileName = (character: string) => {
    switch (character) {
      case "앙글이":
        return "앙글이.png";
      case "웅이":
        return "웅이.png";
      case "티바노":
        return "티바노.png";
      default:
        return "앙글이.png"; // 예외처리용 기본 이미지
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <HomeIcon onClick={() => navigate("/")}>
          <img src="/images/home.png" alt="home" width={50} />
        </HomeIcon>
        <Title>{character}와의 대화</Title>
        <EndChatButton onClick={endChatting}>
          <img src="/images/arrow.png" alt="다음" />
        </EndChatButton>
      </TitleWrapper>

      <ChatBox>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role}>
            {msg.role !== "user" ? (
              <>
                <ProfileImage
                  src={`/images/characters/${getImageFileName(character)}`}
                  alt={character}
                />
                <RightColumn>
                  <Name>{character}</Name>
                  <Bubble role={msg.role}>{msg.content}</Bubble>
                </RightColumn>
              </>
            ) : (
              <Bubble role={msg.role}>{msg.content}</Bubble>
            )}
          </Message>
        ))}
        {loading && <div>응답 중...</div>}
        <div ref={bottomRef} />
      </ChatBox>

      <InputArea>
        <TextInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
        />
        <SendButton onClick={handleSend} disabled={loading}>
          <img src="/images/send.png" alt="다음" />
        </SendButton>
      </InputArea>
    </Container>
  );
};

export default ChatPage;
