import { useState } from "react";
import {
  Body,
  CharacterImg,
  CharacterName,
  CharacterRow,
  CommentCard,
  CommentText,
  StarIcon,
  StarIconFill,
} from "../DiaryDetail";
import styled from "styled-components";
import {
  IoChevronBack,
  IoChevronForward,
  IoHomeOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const dummyComments = [
  "오랜만에 영화관에서 좋은 시간 보냈다니 내가 다 기쁘다! 너의 여유로운 하루가 참 따뜻하게 느껴져 :)",
  "오늘 하루도 수고 많았어! 너의 일상이 더 행복해지길 바랄게.",
  "새로운 도전을 했다는 말에 나도 힘이 나! 계속 응원할게 :)",
];

const Comments = () => {
  const [starred, setStarred] = useState<boolean[]>(
    new Array(dummyComments.length).fill(false),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
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
    <Body>
      <HeaderWrapper>
        <IoHomeOutline
          size={24}
          color="#2d3552"
          onClick={() => navigate("/")}
        />

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
      <div>즐겨찾기 한 코멘트 목록</div>
      {dummyComments.map((comment, index) => (
        <CommentCard key={index}>
          <CharacterRow>
            <CharacterImg src={`/images/characters/웅이.png`} alt="웅이" />
            <CharacterName>웅이</CharacterName>
            {starred[index] ? (
              <StarIconFill
                onClick={() => {
                  const newStars = [...starred];
                  newStars[index] = false;
                  setStarred(newStars);
                }}
              />
            ) : (
              <StarIcon
                onClick={() => {
                  const newStars = [...starred];
                  newStars[index] = true;
                  setStarred(newStars);
                }}
              />
            )}
          </CharacterRow>
          <CommentText>{comment}</CommentText>
        </CommentCard>
      ))}
    </Body>
  );
};

export default Comments;

const characterList = ["웅이", "앙글이", "티바노"];

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
  width: 160px; /* 고정 너비로 좌우 아이콘 위치 유지 */
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
  width: 28px; /* 오른쪽 균형용 */
`;

const ClickableIcon = styled.div`
  cursor: pointer;
`;
