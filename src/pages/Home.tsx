import styled from "styled-components";
import DiaryList from "../components/home/DiaryList";

const Home = () => {
  return (
    <Wrapper>
      <Header>SoulMate</Header>
      <DiaryList />
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
  // height: 100vh;
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;
