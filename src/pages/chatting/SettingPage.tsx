import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSettingStore } from "../../services/zustand/setting";
import { useNavigate } from "react-router-dom";
import { postCharacter } from "../../services/apis/chatting/chat";
import CustomDatePicker from "../../components/CustomDatePicker";

const characters = [
  {
    id: "1",
    name: "앙글이",
    description:
      "앙글이는 늘 화가 나있지만, 화가 나는 상황에서 속이 뻥 뚫리게 같이 화를 내줄 수 있습니다!",
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
  const [step, setStep] = useState<"date" | "character">("date");
  const searchParams = new URLSearchParams(window.location.search);
  const nextPage = searchParams.get("nextPage");
  const [page, setPage] = useState<"chatting" | "writing">("writing");

  useEffect(() => {
    if (nextPage === "chatting") {
      setPage("chatting");
      console.log("nextPage is chatting");
    } else {
      setPage("writing");
      console.log("nextPage is writing");
    }
  }, [nextPage]);

  type PickerValue = {
    year: string | number;
    month: string | number;
    day: string | number;
  };

  const [localDate, setLocalDate] = useState<PickerValue>({
    year: selectedDate?.getFullYear() || 2025,
    month: (selectedDate?.getMonth() || 0) + 1,
    day: selectedDate?.getDate() || 1,
  });

  const handleDateNext = () => {
    const year = Number(localDate.year);
    const month = Number(localDate.month);
    const day = Number(localDate.day);
    const fullDate = new Date(year, month - 1, day);
    setDate(fullDate);
    setStep("character");
  };

  const handleDateChange = (newDate: PickerValue) => {
    setLocalDate(newDate);
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
      const chatIdFromApi = response.chatId;

      if (chatIdFromApi) {
        setChatId(chatIdFromApi);
        console.log("넘어가는 날짜:", selectedDate);
        console.log("넘어가는 캐릭터:", selectedCharacter);

        // 페이지에 따라 분기
        if (page === "chatting") {
          navigate(`/chat/${chatIdFromApi}/${selectedChar.name}`);
        } else {
          navigate("/writing");
        }
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
          <HomeIcon onClick={() => navigate("/")}>
            <img src="/images/home.png" alt="home" width={50} />
          </HomeIcon>
          <Title>언제의 기록을 담고 싶나요?</Title>
          <CustomDatePicker value={localDate} onChange={handleDateChange} />
          <NextButton onClick={handleDateNext}>
            <img src="/images/next.png" alt="다음" />
          </NextButton>
        </>
      )}

      {step === "character" && (
        <>
          <HomeIcon onClick={() => navigate("/")}>
            <img src="/images/home.png" alt="home" width={50} />
          </HomeIcon>
          <Title>누구와 대화하고 싶나요?</Title>
          <CharacterList>
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                selected={selectedCharacter === char.id}
                onClick={() => setCharacter(char.id)}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "contain",
                    marginBottom: "-0.5rem",
                  }}
                />
              </CharacterCard>
            ))}
          </CharacterList>

          {selectedCharacter && (
            <CharacterDetail>
              <CharacterName>
                {characters.find((c) => c.id === selectedCharacter)?.name}
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

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #fce4ec, #e0f7fa);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const HomeIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #364b76;
  margin-bottom: 2rem;
  width: 500px;
  height: 100px;
  text-align: center;
  margin-bottom: -1.5rem;
`;

export const NextButton = styled.button`
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

export const CharacterList = styled.div`
  display: flex;
  // gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const CharacterCard = styled.div<{ selected: boolean }>`
  width: 80%;
  cursor: pointer;
  // padding: 0.5rem;
  border: 2px solid ${({ selected }) => (selected ? "#9FACBA" : "unset")};
  border-radius: 0.375rem;
  text-align: center;
`;

export const CharacterDetail = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  background-color: #fff8f8;
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 200px;
  color: #364b76;
  text-align: center;
  margin-bottom: 2rem;
`;

export const CharacterName = styled.h3`
  font-weight: bold;
  font-size: 2rem;
  color: #364b76;
`;
