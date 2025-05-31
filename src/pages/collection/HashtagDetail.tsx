import { useState } from "react";
import Header from "../../components/diary/Header";
import { Body } from "../DiaryDetail";
import DiaryList from "../../components/home/DiaryList";

const characterList = [
  "슬픔",
  "행복",
  "기쁨",
  "사랑",
  "우정",
  "추억",
  "여행",
  "일상",
  "꿈",
];

const HashtagDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Body>
      <Header
        characterList={characterList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <DiaryList />
    </Body>
  );
};
export default HashtagDetail;
