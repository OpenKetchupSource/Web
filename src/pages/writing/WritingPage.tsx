import { useState } from "react";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { postWritingDiary } from "../../services/apis/diary/writing";
import { useSettingStore } from "../../services/zustand/setting";

const WritingPage = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const { selectedDate } = useSettingStore();
  const navigate = useNavigate();

  // 날짜 포맷 처리
  const formattedDate =
    selectedDate instanceof Date
      ? selectedDate.toISOString().split("T")[0] // YYYY-MM-DD
      : selectedDate;

  const displayDate =
    selectedDate instanceof Date
      ? selectedDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replace(/\. /g, ".").replace(/\.$/, ".")
      : selectedDate;

  const handleSubmit = async () => {
    const confirmed = window.confirm("작성을 종료하시겠습니까?");
    if (!confirmed) return;
    try {
      const response = await postWritingDiary({
        date: formattedDate,
        title,
        content,
        hashtag: tags,
        character: "앙글이",
      });

      navigate(`/diary/${response.data.id}`);
    } catch (error) {
      console.error("일기 저장 실패:", error);
      alert("일기 저장 중 오류가 발생했습니다.");
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
