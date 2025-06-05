import { useEffect, useState } from "react";
import Header from "../../components/diary/Header";
import { Body } from "../DiaryDetail";
import DiaryList from "../../components/home/DiaryList";
import { getHashtag, getHashtags } from "../../services/apis/hashtag/hashtag";
import { useParams, useNavigate, useLocation } from "react-router-dom";

interface Hashtag {
  HashTagId: string;
  HashTagName: string;
}

const HashtagDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 현재 경로 확인용
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);

  useEffect(() => {
    getHashtags()
      .then((response) => {
        setHashtags(response.data);
      })
      .catch((error) => {
        console.error("해시태그 목록 불러오기 실패:", error);
      });
  }, []);

  useEffect(() => {
    if (name && hashtags.length > 0) {
      const index = hashtags.findIndex(tag => tag.HashTagName === name);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [name, hashtags]);

  useEffect(() => {
    if (hashtags.length === 0) return;

    const newName = hashtags[currentIndex]?.HashTagName;
    const newPath = `/hashtag/${newName}`;

    if (newName && location.pathname !== newPath) {
      navigate(newPath, { replace: true });
    }
  }, [currentIndex, hashtags, location.pathname, navigate]); // 👈 location.pathname 의존성 추가

  useEffect(() => {
    if (!name || hashtags.length === 0) return;

    const tag = hashtags.find(tag => tag.HashTagName === name);
    if (tag) {
      getHashtag(tag.HashTagId)
        .then((response) => {
          console.log("해시태그 데이터:", response.data);
        })
        .catch((error) => {
          console.error("해시태그 데이터 불러오기 실패:", error);
        });
    }
  }, [name, hashtags]);

  return (
    <Body>
      <Header
        characterList={hashtags.map(tag => tag.HashTagName)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <DiaryList />
    </Body>
  );
};

export default HashtagDetail;
