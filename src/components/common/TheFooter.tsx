import { BsChat, BsPencil, BsStar } from "react-icons/bs";
import { GoHash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const TheFooter = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Buttons>
        <Button onClick={() => navigate("/hashtags")}>
          <GoHash size={24} />
        </Button>
        <Button onClick={() => navigate("/setChatting")}>
          <BsChat size={24} />
        </Button>
        <Button onClick={() => navigate("/writing")}>
          <BsPencil size={24} />
        </Button>
        <Button onClick={() => navigate("/comments")}>
          <BsStar size={24} />
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
  background: #fff8f8;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
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
