import styled from "styled-components";
import DiaryList from "../components/home/DiaryList";
import { TheFooter } from "../components/common/TheFooter";

const Home = () => {
  return (
    <Wrapper>
      <Header>SoulMate</Header>
      <Title>최근 일기 목록</Title>
      <DiaryList />
      <TheFooter />
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
`;