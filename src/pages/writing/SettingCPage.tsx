import { useNavigate } from "react-router-dom";
import {
  CharacterCard,
  CharacterDetail,
  CharacterList,
  Container,
  HomeIcon,
  NextButton,
  Title,
} from "../chatting/SettingPage";
import { CharacterName } from "../DiaryDetail";
import { useSettingStore } from "../../services/zustand/setting";

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

const SettingCPage = () => {
  const { selectedCharacter, setCharacter } = useSettingStore();
  const navigate = useNavigate();

  const handleDateNext = () => {
    navigate("/writing");
  };
  return (
    <Container>
      <HomeIcon onClick={() => navigate("/")}>
        <img src="/images/home.png" alt="home" width={50} />
      </HomeIcon>
      <Title>누구와 일기를 공유하고 싶나요?</Title>
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
            {characters.find((c) => c.id === selectedCharacter)?.description}
          </p>
        </CharacterDetail>
      )}
      <NextButton onClick={handleDateNext}>
        <img src="/images/next.png" alt="다음" />
      </NextButton>
    </Container>
  );
};

export default SettingCPage;
