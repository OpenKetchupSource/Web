import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSettingStore } from "../../services/zustand/setting";
import { postCharacter } from "../../services/apis/chatting/chat";

// 캐릭터 목록
const characters = [
  {
    id: "1",
    name: "앙글이",
    description:
      "화가 나지만, 상황에서 속이 뻥 뚫리게 같이 화를 내줄 수 있어요!",
  },
  {
    id: "2",
    name: "웅이",
    description: "항상 즐겁고 기분을 북돋아주는 친구예요.",
  },
  {
    id: "3",
    name: "티바노",
    description: "차분하게 상황을 바라볼 수 있도록 도와줘요.",
  },
];

const SettingPage: React.FC = () => {
  const { selectedDate, setDate, selectedCharacter, setCharacter } =
    useSettingStore((state) => ({
      selectedDate: state.selectedDate,
      setDate: state.setDate,
      selectedCharacter: state.selectedCharacter,
      setCharacter: state.setCharacter,
    }));

  const [isDateView, setIsDateView] = useState(true);
  const navigate = useNavigate();

  // 날짜 드롭다운용 state
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const handleDateNext = () => {
    if (!selectedDate) return alert("날짜를 선택해주세요.");
    setIsDateView(false);
  };

  const handleStart = async () => {
    const char = characters.find((c) => c.id === selectedCharacter);
    if (!char) return alert("캐릭터를 선택해주세요.");

    try {
      const res = await postCharacter(char.name);
      if (res.chatId) {
        navigate(`/chat/${res.chatId}/${char.name}`);
      } else {
        console.error("chatId 없음");
      }
    } catch (err) {
      console.error("API 실패:", err);
    }
  };

  return (
    <FullPage>
      {isDateView ? (
        <>
          <Title>언제의 기록을 담고 싶나요?</Title>
          <DatePickerRow>
            <Select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y} 년
                </option>
              ))}
            </Select>

            <Select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m} 월
                </option>
              ))}
            </Select>

            <Select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d} 일
                </option>
              ))}
            </Select>
          </DatePickerRow>

          <ArrowButton
            onClick={() => {
              const selected = new Date(year, month - 1, day);
              setDate(selected);
              setIsDateView(false);
            }}
          >
            →
          </ArrowButton>
        </>
      ) : (
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
              <strong>
                {characters.find((c) => c.id === selectedCharacter)?.name}
              </strong>
              <p>
                {
                  characters.find((c) => c.id === selectedCharacter)
                    ?.description
                }
              </p>
            </CharacterDetail>
          )}

          <NextButton onClick={handleStart}>→</NextButton>
        </>
      )}
    </FullPage>
  );
};

export default SettingPage;

const FullPage = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #fce4ec, #e0f7fa);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const DatePickerRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Select = styled.select`
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 2px solid #4a5568;
  background: transparent;
  appearance: none;
  text-align: center;
  color: #2c3e50;
  font-weight: 500;
`;

const ArrowButton = styled.button`
  background-color: white;
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  font-size: 2rem;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const DateInput = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
`;

const NextButton = styled.button`
  font-size: 2rem;
  margin-top: 2rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const CharacterList = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CharacterCard = styled.div<{ selected: boolean }>`
  border: 2px solid ${({ selected }) => (selected ? "#3b82f6" : "#d1d5db")};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CharacterDetail = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
`;
