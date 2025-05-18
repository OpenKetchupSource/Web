import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log('인가 코드:', code);

    if (code) {
      axios.post('http://localhost:5173/api/oauth/login',
        JSON.stringify({ code }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        console.log('로그인 성공', response.data);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      })
      .catch(error => {
        console.error('로그인 실패', error);
      });
    }
  }, [location]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
