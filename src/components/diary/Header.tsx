import styled from "styled-components";
import {
  IoChevronBack,
  IoChevronForward,
  IoHomeOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  characterList: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Header = ({
  characterList,
  currentIndex,
  setCurrentIndex,
}: HeaderProps) => {
  const navigate = useNavigate();

  const goPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + characterList.length) % characterList.length,
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characterList.length);
  };

  return (
    <HeaderWrapper>
      <IoHomeOutline size={24} color="#2d3552" onClick={() => navigate("/")} />

      <CenterContainer>
        <ClickableIcon onClick={goPrev}>
          <IoChevronBack />
        </ClickableIcon>
        <Name>{characterList[currentIndex]}</Name>
        <ClickableIcon onClick={goNext}>
          <IoChevronForward />
        </ClickableIcon>
      </CenterContainer>

      <Placeholder />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CenterContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2d3552;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Name = styled.span`
  flex: 1;
  text-align: center;
`;

const Placeholder = styled.div`
  width: 28px;
`;

const ClickableIcon = styled.div`
  cursor: pointer;
`;
