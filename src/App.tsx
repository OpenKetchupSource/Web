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
  position: relative;
  min-height: 100vh;
  padding-bottom: 60px; /* Footer height */
  box-sizing: border-box;
  background-color: #f8f9fa; /* Light background color */
  @media (max-width: 600px) {
    padding-bottom: 50px; /* Adjusted for smaller screens */
  }
  @media (max-width: 400px) {
    padding-bottom: 40px; /* Further adjustment for very small screens */
  }
`;
