import { useState } from "react";
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
  setIsLogin();
  return <div></div>;
};

const MyDiary = () => {
  return <div>마이 다이어리~</div>;
};

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  return isLogin ? <MyDiary /> : <Login setIsLogin={setIsLogin} />;
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
