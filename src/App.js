import { useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return isLogin ? (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<MyDiary />} />
      </Route>
    </Routes>
  ) : (
    <Cover />
  );
}

const Cover = () => {
  // 한번 해봤으니까 라우터로 바꾸기...
  const [view, setView] = useState();
  switch (view) {
    case "join":
      return <Join />;
    case "login":
      return <Login />;
    default:
      return (
        <div>
          <h3>비회원을 위한 홍보화면</h3>
          <button onClick={() => setView("join")}>회원가입</button>
          <button onClick={() => setView("login")}>로그인</button>
        </div>
      );
  }
};

const Join = () => {
  return <div>회원가입폼</div>;
};

const Login = () => {
  return (
    <div>
      <h3>로그인 페이지</h3>
      <button>로그인</button>
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
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
