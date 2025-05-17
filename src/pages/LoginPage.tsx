import styled from "styled-components";
import Login from "../components/login/Login";

const LoginPage = () => {

  return (
    <Wrapper>
    <Logo src="/images/icon.png" alt="logo" />
    <Login />
    </Wrapper>
  );
}
export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
`;