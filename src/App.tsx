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

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/diarydetail/:id" element={<DiaryDetail />} />
          <Route path="/setChatting" element={<SettingPage />} />
          <Route path="/chat" element={<ChatPage />} />

          <Route path="/comments" element={<Comments />} />
          <Route path="/hashtags" element={<Hashtags />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fce8e7 0%, #e3ecf5 100%);
`;
