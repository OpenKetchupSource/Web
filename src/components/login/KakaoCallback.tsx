import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log('인가 코드:', code);

    if (code) {
      axios.post('https://soulmate.o-r.kr/api/oauth/login',{ 
        "code": code 
      },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        // console.log('로그인 성공', response.data);
        // console.log('access_token:', response.data.result.tokens.accessToken);
        localStorage.setItem('token', response.data.result.tokens.accessToken);
      })
      .catch(error => {
        console.error('로그인 실패', error);
      });
    }
  }, [location]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
