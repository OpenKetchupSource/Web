import { useState } from "react";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { postWritingDiary } from "../../services/apis/diary/writing";
import { useSettingStore } from "../../services/zustand/setting";
import {
  generateAngAIComment,
  generateOongAIComment,
  generateTeeAIComment,
} from "../../services/gpt/openai";
import { postComment } from "../../services/apis/diary/diary";

const WritingPage = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const { selectedDate, selectedCharacter } = useSettingStore();
  const navigate = useNavigate();

  // 날짜 포맷 처리
  const formattedDate =
    selectedDate instanceof Date
      ? selectedDate.toISOString().split("T")[0] // YYYY-MM-DD
      : selectedDate;

  const displayDate =
    selectedDate instanceof Date
      ? selectedDate
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\. /g, ".")
          .replace(/\.$/, ".")
      : selectedDate;

  const handleSubmit = async () => {
    if (!title || !content || !tags) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const confirmed = window.confirm("작성을 종료하시겠습니까?");
    if (!confirmed) return;

    // 기본 캐릭터 설정
    const selectedChar = selectedCharacter ?? "앙글이";

    try {
      const response = await postWritingDiary({
        date: formattedDate,
        title,
        content,
        hashtag: tags,
        character: selectedChar,
      });

      const diaryId = response.data.id;

      const characterMap = {
        앙글이: 1,
        웅이: 2,
        티바노: 3,
      } as const;
      const characterId =
        characterMap[selectedChar as keyof typeof characterMap];
      const aiComment = await generateAIComment(characterId);

      if (aiComment) {
        const characterId =
          characterMap[selectedChar as keyof typeof characterMap];

        if (!characterId) {
          console.error("characterId가 정의되지 않았습니다.");
          console.error("selectedCharacter 값:", selectedChar);
          alert("캐릭터 정보에 문제가 있습니다.");
          return;
        }

        console.log("✅ postComment 호출", {
          diaryId,
          comment: aiComment,
          characterId,
        });

        await postComment(diaryId, aiComment, characterId);
      }

      navigate(`/diary/${diaryId}`);
    } catch (error) {
      console.error("일기 저장 실패:", error);
      alert("일기 저장 중 오류가 발생했습니다.");
    }
  };

  const generateAIComment = async (character: number): Promise<string> => {
    try {
      switch (character) {
        case 1:
          return await generateAngAIComment(content, title);
        case 2:
          return await generateOongAIComment(content, title);
        case 3:
          return await generateTeeAIComment(content, title);
        default:
          console.warn("알 수 없는 캐릭터입니다. 기본 캐릭터를 사용합니다.");
          return await generateOongAIComment(content, title);
      }
    } catch (err) {
      console.error("AI 코멘트 생성 실패:", err);
      return "";
    }
  };

  return (
    <Container>
      <Header>
        <HomeIcon onClick={() => navigate("/")} />
        <DateText>{displayDate}</DateText>
        <ArrowIcon onClick={handleSubmit} />
      </Header>
      <Body>
        <TextInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
        />
        <TagInput
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="해시태그를 입력해주세요."
        />
        <ContentArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="일기 내용을 작성해주세요."
        />
      </Body>
    </Container>
  );
};

export default WritingPage;

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

const ArrowIcon = styled(BsArrowRight)`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #1e2a52;
`;

const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TextInput = styled.input`
  font-family: "Gowun Dodum", sans-serif;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: transparent;
  font-size: 20px;
  outline: none;

  &::placeholder {
    color: #b0bcd2;
  }
`;

const TagInput = styled.input`
  font-family: "Gowun Dodum", sans-serif;
  border: none;
  padding: 12px 16px;
  background-color: white;
  border-radius: 12px;
  outline: none;
  &::placeholder {
    color: #b0bcd2;
  }
`;

const ContentArea = styled.textarea`
  font-family: "Gowun Dodum", sans-serif;
  min-height: 160px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: transparent;
  font-size: 14px;
  resize: vertical;
  border: none;
  box-shadow: 0 0 0 1px #e5e7eb;
  outline: none;

  &::placeholder {
    color: #6d7ea0;
  }
`;
