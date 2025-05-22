import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import KakaoCallback from './components/login/KakaoCallback'
import DiaryDetail from './pages/DiaryDetail'
import Comments from './pages/collection/Comments'
import Hashtags from './pages/collection/Hashtags'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/diarydetail/:id" element={<DiaryDetail />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/hashtags" element={<Hashtags />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
