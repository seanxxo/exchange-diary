import { useState } from "react";
import { registUser, isDuplicateId, login } from "./user";

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
  const [joinErrMsg, setJoinErrMsg] = useState("");
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    registUser(values.id, values.pw) ? setIsLogin(true) : setIsLogin(false);
  };

  const handleChange = (e) => {
    const tmpValues = { ...values };
    tmpValues[e.target.name] = e.target.value;
    setValues(tmpValues);
  };

  return (
    <div>
      <h3>회원가입폼</h3>
      <SoftAlert message={joinErrMsg} />
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>
          아이디
          <input name="id" type="email"></input>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            isDuplicateId(values.id, setJoinErrMsg);
          }}
        >
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
  const [loginErrMsg, setLoginErrMsg] = useState("");
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const tmpValues = { ...values };
    tmpValues[e.target.name] = e.target.value;
    setValues(tmpValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginWithInput = login(values.id, values.pw);
    if (loginWithInput.result) {
      setIsLogin(true);
    } else {
      setLoginErrMsg(loginWithInput.errMsg);
    }
  };

  return (
    <div>
      <h3>로그인 폼</h3>
      <SoftAlert message={loginErrMsg} />
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>
          아이디
          <input name="id" type="email"></input>
        </label>
        <label>
          비밀번호
          <input name="pw" type="password"></input>
        </label>
        <input type="submit" value="제출"></input>
      </form>
    </div>
  );
};

const SoftAlert = ({ message }) => {
  return message ? <div>{message}</div> : null;
};

const Logout = ({ setIsLogin }) => {
  const handleClick = () => {
    setIsLogin(false);
  };
  return <button onClick={handleClick}>로그아웃</button>;
};

export default App;
