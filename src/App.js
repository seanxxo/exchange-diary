import React, { useContext, useEffect, useState } from "react";

const LoginContext = React.createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={setIsLogin}>
      {isLogin ? <MyDiary /> : <Cover />}
    </LoginContext.Provider>
  );
}

// const useObserber = (hook, value) => {
//   useEffect(hook(value));
// };

const Cover = () => {
  const [view, setView] = useState();
  const init = (
    <div>
      <h3>비회원을 위한 홍보화면</h3>
      <button onClick={() => setView(<Join />)}>회원가입</button>
      <button onClick={() => setView(<Login />)}>로그인</button>
    </div>
  );
  return view || init;
};

const Join = () => {
  return <div>회원가입폼</div>;
};

const Login = () => {
  // const useClick = () => {
  //   useContext(LoginContext)(true);
  // };
  return (
    <div>
      <h3>로그인 페이지</h3>
      {/* <button onClick={useClick}>로그인</button> */}
    </div>
  );
};

const MyDiary = () => {
  return (
    <div>
      <h3>마이다이어리~</h3>
      <button onClick={() => Logout()}>로그아웃</button>
    </div>
  );
};

const Logout = ({ setIsLogin }) => {
  useEffect(() => {
    setIsLogin(false);
  });
};

const Layout = () => {
  return (
    <div className="layout">
      <header></header>
      <main>{/* <Outlet /> */}</main>
    </div>
  );
};

export default App;
