import { useEffect, useState } from "react";
import {
  Body,
  CharacterImg,
  CharacterName,
  CharacterRow,
  CommentCard,
  CommentText,
  StarIconFill,
} from "../DiaryDetail";
import Header from "../../components/diary/Header";
import {
  getComments,
  postCommentCol,
} from "../../services/apis/collection/collection";
import styled from "styled-components";
import { formatDate } from "../../components/common/FormatDate";

const characterList = ["앙글이", "웅이", "티바노"];

interface CommentItem {
  id: string;
  context: string;
  character: string;
  date: string;
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

  const handleStarClick = async (index: number, id: string) => {
    try {
      await postCommentCol(id);

      // 코멘트 목록에서 해당 항목 제거
      const newComments = comments.filter((_, i) => i !== index);
      setComments(newComments);

      // 별 상태도 함께 갱신
      const newStars = starred.filter((_, i) => i !== index);
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
        <CommentCard key={commentItem.id}>
          <CharacterRow>
            <CharacterImg
              src={`/images/characters/${commentItem.character}.png`}
              alt={commentItem.character}
            />
            <CharacterName>{commentItem.character}</CharacterName>
            <CommentDate>{formatDate(commentItem.date)}</CommentDate>
            <StarIconFill
              onClick={handleStarClick.bind(null, index, commentItem.id)}
            />
          </CharacterRow>

          <CommentText>{commentItem.context}</CommentText>
        </CommentCard>
      ))}
    </Body>
  );
};

export default Comments;

const CommentDate = styled.div`
  font-size: 14px;
  color: #6d7ea0;
  margin-left: 8px;
`;
