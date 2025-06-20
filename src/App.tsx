import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import KakaoCallback from "./components/login/KakaoCallback";
import DiaryDetail from "./pages/DiaryDetail";
import Comments from "./pages/collection/Comments";
import Hashtags from "./pages/collection/Hashtags";
import SettingPage from "./pages/chatting/SettingPage";
import ChatPage from "./pages/chatting/ChatPage";
import styled from "styled-components";
import WritingPage from "./pages/writing/WritingPage";
import Testpage from "./pages/Testpage";
import EditPage from "./pages/writing/EditPage";
import HashtagDetail from "./pages/collection/HashtagDetail";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/diary/:diaryId" element={<DiaryDetail />} />
          <Route path="/setChatting" element={<SettingPage />} />
          <Route path="/chat/:chatId/:character" element={<ChatPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/edit/:diaryId" element={<EditPage />} />

          <Route path="/comments" element={<Comments />} />
          <Route path="/hashtags" element={<Hashtags />} />
          <Route path="/hashtag/:name" element={<HashtagDetail />} />
          <Route path="/test" element={<Testpage />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 600px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  background: linear-gradient(to bottom, #fce8e7 0%, #e3ecf5 100%);
`;
