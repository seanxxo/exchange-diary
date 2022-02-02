import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

const Login = ({ setIsLogin }) => {
  useEffect(() => {
    setIsLogin(true);
  });
  return <div>로그인하쉐이~</div>;
};

const Logout = ({ setIsLogin }) => {
  useEffect(() => {
    console.log(this);
    setIsLogin(false);
  });
  return <div>로그아웃 되었음</div>;
};

const MyDiary = ({ setIsLogin }) => {
  return (
    <div>
      <h3>마이다이어리~</h3>
      <button onClick={() => Logout(setIsLogin)}>로그아웃 하기~</button>
    </div>
  );
};

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  return isLogin ? (
    <MyDiary setIsLogin={setIsLogin} />
  ) : (
    <Login setIsLogin={setIsLogin} />
  );
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
