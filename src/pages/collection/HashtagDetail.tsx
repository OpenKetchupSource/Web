import { useEffect, useState } from "react";
import Header from "../../components/diary/Header";
import { Body } from "../DiaryDetail";
import DiaryList from "../../components/home/DiaryList";
import { getHashtags } from "../../services/apis/hashtag/hashtag";
import { useParams, useNavigate } from "react-router-dom";

const HashtagDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [hashtags, setHashtags] = useState<string[]>([]);

  // 해시태그 목록 가져오기
  useEffect(() => {
    getHashtags()
      .then((response) => {
        const hashtagNames = response.data.map((tag: { HashTagName: string }) => tag.HashTagName);
        setHashtags(hashtagNames);
      })
      .catch((error) => {
        console.error("해시태그 목록 불러오기 실패:", error);
      });
  }, []);

  // URL 파라미터(name)가 바뀌었을 때 currentIndex 업데이트
  useEffect(() => {
    if (name && hashtags.length > 0) {
      const index = hashtags.indexOf(name);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [name, hashtags]);

  // currentIndex가 바뀌면 URL도 변경
  useEffect(() => {
    if (hashtags.length > 0) {
      const newName = hashtags[currentIndex];
      if (newName && name !== newName) {
        navigate(`/hashtag/${newName}`);
      }
    }
  }, [currentIndex, hashtags]);

  return (
    <Body>
      <Header
        characterList={hashtags}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <DiaryList />
    </Body>
  );
};

export default HashtagDetail;
