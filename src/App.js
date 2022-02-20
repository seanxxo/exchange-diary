import { useState } from "react";
import { registUser, isDuplicateId } from "./user";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(`render App`);

  return isLogin ? (
    <MyDiary setIsLogin={setIsLogin} />
  ) : (
    <Cover setIsLogin={setIsLogin} />
  );
}

const MyDiary = ({ setIsLogin }) => {
  console.log(`render MyDiary`);
  return (
    <div>
      <h3>마이다이어리~</h3>
      <Logout setIsLogin={setIsLogin} />
      <button>간단한 마이페이지</button>
      <Content />
    </div>
  );
};

const Content = () => (
  <div>
    <h3>접속 첫 화면</h3>
    <button>오늘 글 쓰기</button>
    <div>n분 후 열람 가능...</div>
    <ul>지난 글 목록</ul>
  </div>
);

const Cover = ({ setIsLogin }) => {
  console.log(`render Cover`);
  const [view, setView] = useState();
  const init = (
    <div>
      <h3>비회원을 위한 홍보화면</h3>
      <button onClick={() => setView(<Join setIsLogin={setIsLogin} />)}>
        회원가입
      </button>
      <button onClick={() => setView(<Login setIsLogin={setIsLogin} />)}>
        로그인
      </button>
    </div>
  );
  return view || init;
};

const Join = ({ setIsLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    const pw = e.target[1].value;
    return registUser(id, pw) ? setIsLogin(true) : setIsLogin(false);
  };

  return (
    <div>
      <h3>회원가입폼</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          아이디
          <input name="id"></input>
        </label>
        <button onClick={(e) => isDuplicateId(e.target.parentElement[0].value)}>
          중복검사
        </button>
        <label>
          비밀번호
          <input name="pw" type="password"></input>
        </label>
        <input type="submit" value="제출"></input>
      </form>
    </div>
  );
};

const Login = ({ setIsLogin }) => {
  const handleClick = () => {
    setIsLogin(true);
  };
  return (
    <div>
      <h3>로그인 페이지</h3>
      <button onClick={handleClick}>로그인</button>
    </div>
  );
};

const Logout = ({ setIsLogin }) => {
  const handleClick = () => {
    setIsLogin(false);
  };
  return <button onClick={handleClick}>로그아웃</button>;
};

export default App;
