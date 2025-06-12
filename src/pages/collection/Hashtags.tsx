import { IoHomeOutline } from "react-icons/io5";
import { Body, Tag } from "../DiaryDetail";
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

export const TagBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  cursor: pointer;
  &: hover {
    background-color: #e0f2fe;
    scale: 1.05;
  }
`;
