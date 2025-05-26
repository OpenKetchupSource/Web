import styled from "styled-components";
import DiaryList from "../components/home/DiaryList";
import { TheFooter } from "../components/common/TheFooter";

const Home = () => {
  return (
    <Wrapper>
      <Header>SoulMate</Header>
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
