import styled from "styled-components";

const Login = () => {
  // const REST_API_KEY = 'b57e43877ad662a5a26d85d3b6ff834e';
  // const REDIRECT_URI = 'http://localhost:5173/oauth/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b57e43877ad662a5a26d85d3b6ff834e&redirect_uri=https://withsoulmate.netlify.app/oauth/kakao/callback`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <Button type="button" onClick={loginHandler}>
      카카오 로그인
    </Button>
  );
};

export default Login;

const Button = styled.button`
  background-color: #fee500;
  width: 50%;
  height: 45px;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffd700;
  }
`;
