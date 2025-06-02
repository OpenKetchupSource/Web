import { useNavigate } from "react-router-dom";
import { Container, HomeIcon, NextButton, Title } from "../chatting/SettingPage";

const SettingCPage = () => {
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
      <NextButton onClick={handleDateNext}>
        <img src="/images/next.png" alt="다음" />
      </NextButton>
    </Container>
  );
};

export default SettingCPage;
