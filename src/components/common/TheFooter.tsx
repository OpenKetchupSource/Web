import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const TheFooter = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Buttons>
        <Button onClick={() => navigate("/")}>
          <div>홈</div>
        </Button>
        <Button onClick={() => navigate("/setChatting")}>
          <div>채팅</div>
        </Button>
        <Button>
          <div>일기 쓰기 (아직 x)</div>
        </Button>
        <Button onClick={() => navigate("/comments")}>
          <div>보관함</div>
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
`;

const Buttons = styled.div`
  background-color: #fafafa;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // padding: 2%;
  height: 60px;
`;

const Button = styled.button`
  background-color: #fafafa;
  color: #6a7282;
  border: none;
  // padding: 2%;
  cursor: pointer;
  gap: 5%;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
`;
