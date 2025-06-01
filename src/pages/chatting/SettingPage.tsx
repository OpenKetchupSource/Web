import React, { useState } from "react";
import styled from "styled-components";
import { useSettingStore } from "../../services/zustand/setting";
import { useNavigate } from "react-router-dom";
import { postCharacter } from "../../services/apis/chatting/chat";

const characters = [
  {
    id: "1",
    name: "앙글이",
    description:
      "화가 나지만, 상황에서 속이 뻥 뚫리게 같이 화를 내줄 수 있어요!",
    image: "/images/characters/앙글이.png",
  },
  {
    id: "2",
    name: "웅이",
    description: "항상 즐겁고 기분을 북돋아주는 친구예요.",
    image: "/images/characters/웅이.png",
  },
  {
    id: "3",
    name: "티바노",
    description: "차분하게 상황을 바라볼 수 있도록 도와줘요.",
    image: "/images/characters/티바노.png",
  },
];

const SettingPage: React.FC = () => {
  const { selectedDate, setDate, selectedCharacter, setCharacter } =
    useSettingStore();
  const [, setChatId] = useState();
  const navigate = useNavigate();
  const [step, setStep] = useState<'date' | 'character'>('date');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
    console.log(
      selectedDate instanceof Date
        ? selectedDate.toISOString().split("T")[0]
        : selectedDate,
    );
  };

  const startChatting = async () => {
    if (!selectedCharacter) {
      alert("캐릭터를 선택해주세요.");
      return;
    }

    const selectedChar = characters.find(
      (char) => char.id === selectedCharacter,
    );
    if (!selectedChar) {
      alert("유효하지 않은 캐릭터입니다.");
      return;
    }

    try {
      const response = await postCharacter(selectedChar.name);
      // console.log("Character set successfully:", response);

      const chatIdFromApi = response.chatId;
      if (chatIdFromApi) {
        setChatId(chatIdFromApi);
        navigate(`/chat/${chatIdFromApi}/${selectedChar.name}`);
      } else {
        console.error("chatId가 응답에 없습니다.");
      }
    } catch (error) {
      console.error("Error setting character:", error);
    }
  };

  return (
    <Container>
      {step === "date" && (
        <>
          <HomeIcon>
            <img src="/images/home.png" alt="home" width={50} />
          </HomeIcon>
          <Title>언제의 기록을 담고 싶나요?</Title>
          <DateInput type="date" onChange={handleDateChange} />
          <NextButton onClick={() => setStep("character")}><img src="/images/next.png" alt="다음" /></NextButton>
        </>
      )}

      {step === "character" && (
        <>
          <Title>누구와 대화하고 싶나요?</Title>
          <CharacterList>
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                selected={selectedCharacter === char.id}
                onClick={() => setCharacter(char.id)}
              >
                {char.name}
              </CharacterCard>
            ))}
          </CharacterList>

          {selectedCharacter && (
            <CharacterDetail>
              <CharacterName>
                {
                  characters.find((c) => c.id === selectedCharacter)?.name
                }
              </CharacterName>
              <p>
                {
                  characters.find((c) => c.id === selectedCharacter)
                    ?.description
                }
              </p>
            </CharacterDetail>
          )}

          <NextButton onClick={startChatting}>
            <img src="/images/next.png" alt="다음" />
          </NextButton>
        </>
      )}
    </Container>
  );
};

export default SettingPage;

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #fce4ec, #e0f7fa);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HomeIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const Title = styled.h1`
  font-size: 2.0rem;
  font-weight: bold;
  color: #364B76;
  margin-bottom: 2rem;
  width: 400px;
  height: 100px;
`;

const DateInput = styled.input`
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
`;

const NextButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const CharacterList = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CharacterCard = styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding: 0.5rem;
  border: 2px solid ${({ selected }) => (selected ? "#3b82f6" : "#d1d5db")};
  border-radius: 0.375rem;
  text-align: center;
`;

const CharacterDetail = styled.div`
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CharacterName = styled.h3`
  font-weight: bold;
`;