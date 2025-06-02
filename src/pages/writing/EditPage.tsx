import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getDiary, putDiary } from "../../services/apis/diary/diary";

const EditPage = () => {
  const { diaryId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (diaryId) {
      getDiary(diaryId)
        .then((data) => {
          setTitle(data.title);
          setTags(data.hashTags.join(", "));
          setContent(data.content);
          setDate(data.date); // 날짜 저장
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching diary:", err);
          setError("일기를 불러오는 데 실패했습니다.");
          setLoading(false);
        });
    }
  }, [diaryId]);

  const handleUpdate = async () => {
    if (!diaryId) return;

    const confirmUpdate = window.confirm("정말로 이 일기를 수정하시겠습니까?");
    if (!confirmUpdate) return;

    try {
      await putDiary(diaryId, {
        date, // 원래 받은 날짜 사용
        title,
        content,
        hashtag: tags
          .split(",")
          .map((tag) => tag.trim())
          .join(" "),
      });
      alert("일기가 수정되었습니다.");
      navigate(`/diary/${diaryId}`);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("일기 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Header>
        <HomeIcon onClick={() => navigate("/")} />
        <DateText>2025.05.01.</DateText>
        <ArrowIcon onClick={handleUpdate} />
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
          placeholder="해시태그를 입력해주세요. (쉼표로 구분)"
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

export default EditPage;

// 스타일 컴포넌트 재사용 (WritingPage와 동일)

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
  cursor: pointer;
`;

const ArrowIcon = styled(BsArrowRight)`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #1e2a52;
  cursor: pointer;
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
