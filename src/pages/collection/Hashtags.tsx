import { IoHomeOutline } from "react-icons/io5";
import { Body, Tag, TagBox } from "../DiaryDetail";
import { useNavigate } from "react-router-dom";

const dummyHashtags = Array.from({ length: 50 }, (_, i) => `더미태그${i + 1}`);

const Hashtags = () => {
  const navigate = useNavigate();
  return (
    <Body>
      <IoHomeOutline size={24} color="#2d3552" onClick={() => navigate("/")} />
      <div>해시태그 목록</div>
      <TagBox>
        {dummyHashtags.map((tag, idx) => (
          <Tag
            key={idx}
            onClick={() => navigate(`/hashtag/${(idx + 1).toString()}`)}
          >
            #{tag}
          </Tag>
        ))}
      </TagBox>
    </Body>
  );
};
export default Hashtags;
