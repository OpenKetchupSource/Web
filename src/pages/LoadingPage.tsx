import styled from "styled-components";

interface LoadingPageProps {
  character: string;
  mode: "writing" | "reading";
}

const messageMap: Record<"writing" | "reading", string> = {
  writing: "일기를 쓰는 중입니다...",
  reading: "일기를 읽는 중입니다...",
};

const LoadingPage = ({ character, mode }: LoadingPageProps) => {
  const gifSrc = `/images/characters/${mode}/${character}.png`;
  const message = messageMap[mode];

  return (
    <LoaderContainer>
      <LoadingImage src={gifSrc} alt="로딩 중..." />
      <LoadingText>{message}</LoadingText>
    </LoaderContainer>
  );
};

export default LoadingPage;

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fef2f2;
`;

const LoadingImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #1e2a52;
  font-weight: 500;
`;
