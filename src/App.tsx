import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import KakaoCallback from './components/login/KakaoCallback'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
