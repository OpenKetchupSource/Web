const Login = () => {
  const REST_API_KEY = 'b57e43877ad662a5a26d85d3b6ff834e';
  const REDIRECT_URI = 'http://localhost:8080/oauth/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button type='button' onClick={loginHandler}>
      로그인 하기
    </button>
  );
};

export default Login;