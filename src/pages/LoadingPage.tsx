import styled from "styled-components";

interface LoadingPageProps {
  character: string;
  mode: "writing" | "reading";
}

interface LoadingPageProps {
  character: string;
  mode: "writing" | "reading";
}

const characterMap: Record<string, string> = {
  앙글이: "ang",
  웅이: "oong",
  티바노: "tee",
};

const LoadingPage = ({ character, mode }: LoadingPageProps) => {
  const characterKey = characterMap[character] || "oong";
  const gifSrc = `/images/characters/${mode}/${characterKey}.gif`;

  const message =
    mode === "writing" ? "일기를 쓰는 중입니다..." : "일기를 읽는 중입니다...";

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
  width: 200px;
  height: 200px;
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #1e2a52;
  font-weight: 500;
`;
