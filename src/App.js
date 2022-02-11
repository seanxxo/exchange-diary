import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <MyDiary setIsLogin={setIsLogin} />
  ) : (
    <Cover setIsLogin={setIsLogin} />
  );
}

const Cover = ({ setIsLogin }) => {
  const [view, setView] = useState();
  const init = (
    <div>
      <h3>비회원을 위한 홍보화면</h3>
      <button onClick={() => setView(<Join />)}>회원가입</button>
      <button onClick={() => setView(<Login setIsLogin={setIsLogin} />)}>
        로그인
      </button>
    </div>
  );
  return view || init;
};

const Join = () => {
  return <div>회원가입폼</div>;
};

const Login = ({ setIsLogin }) => {
  const login = () => {
    setIsLogin(true);
  };
  return (
    <div>
      <h3>로그인 페이지</h3>
      <button onClick={login}>로그인</button>
    </div>
  );
};

const MyDiary = ({ setIsLogin }) => {
  return (
    <div>
      <h3>마이다이어리~</h3>
      <Logout setIsLogin={setIsLogin} />
    </div>
  );
};

const Logout = ({ setIsLogin }) => {
  const logout = () => {
    setIsLogin(false);
  };
  return <button onClick={logout}>로그아웃</button>;
};

export default App;
