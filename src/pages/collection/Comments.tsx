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

const characterList = ["앙글이","웅이","티바노"];

const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
    const [starred, setStarred] = useState<boolean[]>(
    new Array(comments.length).fill(false),
  );

  useEffect(() => {
    getComments((currentIndex+1).toString())
      .then((response) => {
        const comments = response.data.result;
        setComments(comments);
        setStarred(new Array(comments.length).fill(false));
      })
      .catch((error) => {
        console.error("코멘트 가져오기 실패:", error);
      });
  }, [currentIndex]);

  return (
    <Body>
      <Header
        characterList={characterList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <div>즐겨찾기 한 코멘트 목록</div>
      {comments.map((comment, index) => (
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
