import { useEffect, useState } from "react";
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
import Header from "../../components/diary/Header";
import { getComments } from "../../services/apis/collection/collection";

const dummyComments = [
  "오랜만에 영화관에서 좋은 시간 보냈다니 내가 다 기쁘다! 너의 여유로운 하루가 참 따뜻하게 느껴져 :)",
  "오늘 하루도 수고 많았어! 너의 일상이 더 행복해지길 바랄게.",
  "새로운 도전을 했다는 말에 나도 힘이 나! 계속 응원할게 :)",
];

const characterList = ["웅이", "앙글이", "티바노"];

const Comments = () => {
  const [starred, setStarred] = useState<boolean[]>(
    new Array(dummyComments.length).fill(false),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getComments(characterList[currentIndex])
      .then((response) => {
        const comments = response.data.comments;
        setStarred(new Array(comments.length).fill(false));
      })
      .catch((error) => {
        console.error("코멘트 가져오기 실패:", error);
      });
  }, []);

  return (
    <Body>
      <Header
        characterList={characterList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

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
