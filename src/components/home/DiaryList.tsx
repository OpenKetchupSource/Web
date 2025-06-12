import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllDiary } from "../../services/apis/diary/diary";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../common/FormatDate";

interface Diary {
  id: number;
  date: string;
  title: string;
  hashTags: string[];
  content: string;
}

const DiaryList = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDiary()
      .then((data) => {
        setDiaries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("일기 불러오기 실패:", err);
        setError("일기를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
      <CardList>
        {diaries.map((diary) => (
          <Card key={diary.id} onClick={() => navigate(`/diary/${diary.id}`)}>
            <DateText>{formatDate(diary.date)}</DateText>
            <DiaryTitle>{diary.title}</DiaryTitle>
            <TagWrapper>
              {diary.hashTags.map((tag, i) => (
                <Tag key={i}>#{tag}</Tag>
              ))}
            </TagWrapper>
            <Content>{diary.content}</Content>
          </Card>
        ))}
      </CardList>
    </Wrapper>
  );
};

export default DiaryList;

export const Wrapper = styled.div`
  padding: 0 12px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const CardList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 60px;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: scale(1.03);
  }
  &:active {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
  }
`;

export const DateText = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const DiaryTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 4px 0;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

export const Tag = styled.span`
  font-size: 14px;
  color: #3b82f6;
  margin-right: 8px;
  flex-shrink: 0;
`;

export const Content = styled.div`
  font-size: 14px;
  color: #4b5563;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 3줄 말줄임 */
  -webkit-box-orient: vertical;
`;
