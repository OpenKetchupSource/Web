import { HiOutlineChat, HiOutlineHashtag, HiOutlinePencil, HiOutlineStar } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const TheFooter = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Buttons>
        <Button onClick={() => navigate("/hashtags")}>
          <HiOutlineHashtag size={24}/>
        </Button>
        <Button onClick={() => navigate("/setChatting")}>
          <HiOutlineChat size={24}/>
        </Button>
        <Button>
          <HiOutlinePencil size={24}/>
        </Button>
        <Button onClick={() => navigate("/comments")}>
          <HiOutlineStar size={24}/>
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
