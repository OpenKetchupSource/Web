import styled from "styled-components";
import { IoHomeOutline, IoTrashBinOutline } from "react-icons/io5";
import { BsPencil, BsStar, BsStarFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDiary } from "../services/apis/diary/diary";
import { generateAIComment } from "../services/gpt/openai";

interface DiaryResponse {
  id: number;
  date: string;
  title: string;
  content: string;
  comment: string;
  character: string;
  hashTags: string[];
}

const DiaryDetail = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const [diary, setDiary] = useState<DiaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [aiComment, setAiComment] = useState<string | null>(null);

  useEffect(() => {
    if (diaryId) {
      getDiary(diaryId)
        .then((data) => {
          setDiary(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching diary:", err);
          setError("일기를 불러오는 데 실패했습니다.");
          setLoading(false);
        });
    }
  }, [diaryId]);

  useEffect(() => {
    if (diary) {
      generateAIComment(diary.content, diary.title)
        .then((comment) => setAiComment(comment))
        .catch(() => setAiComment("AI 코멘트를 생성하는 데 실패했습니다."));
    }
  }, [diary]);

  const [starred, setStarred] = useState(false);

  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}.`;
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!diary) return <div>일기 데이터가 없습니다.</div>;

  return (
    <Container>
      <Header>
        <HomeIcon onClick={() => navigate("/")} />
        <DateText>{formatDate(diary.date)}</DateText>
        <TrashIcon onClick={() => alert("삭제 기능은 준비 중입니다.")} />
        <EditIcon onClick={() => alert("수정 기능은 준비 중입니다.")} />
        {/* <EditIcon onClick={() => navigate(`/edit/${diary.id}`)} /> */}
      </Header>

      <Body>
        <Title>{diary.title}</Title>
        <TagBox>
          {diary.hashTags && diary.hashTags.length > 0 ? (
            diary.hashTags.map((tag, idx) => <Tag key={idx}>#{tag}</Tag>)
          ) : (
            <Tag>#태그없음</Tag>
          )}
        </TagBox>

        <Content>{diary.content}</Content>

        <CommentTitle>AI 친구의 코멘트</CommentTitle>
        <CommentCard>
          <CharacterRow>
            <CharacterImg
              src={`/images/characters/${diary.character}.png`}
              alt={diary.character}
            />
            <CharacterName>{diary.character}</CharacterName>
                    {starred ? (
          <StarIconFill onClick={() => setStarred(false)} />
        ) : (
          <StarIcon onClick={() => setStarred(true)} />
        )}
          </CharacterRow>
          <CommentText>
            {aiComment || "AI 코멘트를 생성 중입니다..."}
          </CommentText>
        </CommentCard>
      </Body>
    </Container>
  );
};

export default DiaryDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  background: #fef2f2;
  padding: 12px 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  text-align: center;
`;

const DateText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1e2a52;
  margin: 0;
`;

const HomeIcon = styled(IoHomeOutline)`
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #1e2a52;
`;

const TrashIcon = styled(IoTrashBinOutline)`
  position: absolute;
  top: 50%;
  right: 56px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #1e2a52;
  size: 40px;
`;

const EditIcon = styled(BsPencil)`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #1e2a52;
`;

const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  border-radius: 8px;
`;

const TagBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #ffffff;
  color: #2563eb;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 0 1px #cbd5e1;
`;

const Content = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #374151;
  white-space: pre-line;
`;

const CommentTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e2a52;
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const CharacterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const CharacterImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CharacterName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e2a52;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
`;

const StarIcon = styled(BsStar)`
  margin-left: auto;
  font-size: 20px;
  cursor: pointer;
`;

const StarIconFill = styled(BsStarFill)`
  margin-left: auto;
  font-size: 20px;
  color: #FFD600;
  cursor: pointer;
`;
