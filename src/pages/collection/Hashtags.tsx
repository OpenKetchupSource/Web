import { IoHomeOutline } from "react-icons/io5";
import { Body, TagBox } from "../DiaryDetail";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHashtags } from "../../services/apis/hashtag/hashtag";
import styled from "styled-components";

interface Hashtag {
  HashTagId: number;
  HashTagName: string;
}

const Hashtags = () => {
  const navigate = useNavigate();
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);

  useEffect(() => {
    getHashtags()
      .then((response) => {
        // console.log("해시태그 목록:", response.data);
        setHashtags(response.data);
      })
      .catch((error) => {
        console.error("해시태그 목록 불러오기 실패:", error);
      });
  }, []);

  return (
    <Body>
      <IoHomeOutline size={24} color="#2d3552" onClick={() => navigate("/")} />
      <div>해시태그 목록</div>
      <TagBox>
        {hashtags.map((tag) => (
          <Tag
            key={tag.HashTagId}
            onClick={() => navigate(`/hashtag/${tag.HashTagName}`)}
          >
            #{tag.HashTagName}
          </Tag>
        ))}
      </TagBox>
    </Body>
  );
};

export default Hashtags;

export const Tag = styled.span`
  background: #ffffff;
  color: #2563eb;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 0 1px #cbd5e1;
  cursor: pointer;
  &:hover {
    background: #e0f2fe;
    color: #1e40af;
    scale: 1.08;
  }
  &:active {
    background: #bfdbfe;
    color: #1e3a8a;
  }
  transition: background 0.3s, color 0.3s;
`;
