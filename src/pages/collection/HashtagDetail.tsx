import { useEffect, useState } from "react";
import Header from "../../components/diary/Header";
import { Body } from "../DiaryDetail";
import { getHashtag, getHashtags } from "../../services/apis/hashtag/hashtag";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardList,
  Content,
  DateText,
  DiaryTitle,
  Tag,
  TagWrapper,
} from "../../components/home/DiaryList";
import { formatDate } from "../../components/common/FormatDate";

interface Hashtag {
  HashTagId: string;
  HashTagName: string;
}

interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
  hashTags: string[];
}

const HashtagDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [diaries, setDiaries] = useState<Diary[]>([]);

  // 해시태그 목록 불러오기
  useEffect(() => {
    getHashtags()
      .then((response) => {
        setHashtags(response.data);
      })
      .catch((error) => {
        console.error("해시태그 목록 불러오기 실패:", error);
      });
  }, []);

  // URL 파라미터 기준으로 인덱스 설정
  useEffect(() => {
    if (name && hashtags.length > 0) {
      const index = hashtags.findIndex((tag) => tag.HashTagName === name);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [name, hashtags]);

  // 인덱스 변경 시 URL 동기화
  useEffect(() => {
    if (hashtags.length === 0) return;

    const newName = hashtags[currentIndex]?.HashTagName;
    const newPath = `/hashtag/${newName}`;

    if (newName && location.pathname !== newPath) {
      navigate(newPath, { replace: true });
    }
  }, [currentIndex]);

  // 해시태그에 해당하는 다이어리 목록 불러오기
  useEffect(() => {
    if (!name || hashtags.length === 0) return;

    const tag = hashtags.find((tag) => tag.HashTagName === name);
    if (tag) {
      getHashtag(tag.HashTagName)
        .then((response) => {
          console.log("해시태그 데이터:", response);
          setDiaries(response);  // response.data는 Diary[]
        })
        .catch((error) => {
          console.error("해시태그 데이터 불러오기 실패:", error);
          setDiaries([]);
        });
    }
  }, [name, hashtags]);

  return (
    <Body>
      <Header
        characterList={hashtags.map((tag) => tag.HashTagName)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
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
    </Body>
  );
};

export default HashtagDetail;
