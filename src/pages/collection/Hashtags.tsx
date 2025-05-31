import { IoHomeOutline } from "react-icons/io5";
import { Body } from "../DiaryDetail";
import { useNavigate } from "react-router-dom";

const Hashtags = () => {
  const navigate = useNavigate();
  return (
    <Body>
      <IoHomeOutline size={24} color="#2d3552" onClick={() => navigate("/")} />
      <div>해시태그 목록</div>
    </Body>
  );
};
export default Hashtags;
