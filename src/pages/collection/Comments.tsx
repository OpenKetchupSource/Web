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
import { getComments, postCommentCol } from "../../services/apis/collection/collection";

const characterList = ["앙글이", "웅이", "티바노"];

interface CommentItem {
  commentId: string;
  context: string;
  character: string;
}

const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [starred, setStarred] = useState<boolean[]>([]);

  useEffect(() => {
    getComments((currentIndex + 1).toString())
      .then((response) => {
        const commentList: CommentItem[] = response.data.result;
        setComments(commentList);
        setStarred(new Array(commentList.length).fill(false));
      })
      .catch((error) => {
        console.error("코멘트 가져오기 실패:", error);
      });
  }, [currentIndex]);

  const handleStarClick = async (index: number, commentId: string) => {
    try {
      await postCommentCol(commentId);
      const newStars = [...starred];
      newStars[index] = true;
      setStarred(newStars);
    } catch (error) {
      console.error("즐겨찾기 실패:", error);
      alert("즐겨찾기 저장에 실패했습니다.");
    }
  };

  return (
    <Body>
      <Header
        characterList={characterList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <div>즐겨찾기 한 코멘트 목록</div>
      {comments.map((commentItem, index) => (
        <CommentCard key={commentItem.commentId}>
          <CharacterRow>
            <CharacterImg
              src={`/images/characters/${commentItem.character}.png`}
              alt={commentItem.character}
            />
            <CharacterName>{commentItem.character}</CharacterName>
            {starred[index] ? (
              <StarIcon
                onClick={() => handleStarClick(index, commentItem.commentId)}
              />):(
              <StarIconFill
                onClick={() => {
                  const newStars = [...starred];
                  newStars[index] = false;
                  setStarred(newStars);
                }}
              />
            )}
          </CharacterRow>
          <CommentText>{commentItem.context}</CommentText>
        </CommentCard>
      ))}
    </Body>
  );
};

export default Comments;
