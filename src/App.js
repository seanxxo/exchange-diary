import { useState } from "react";
import { registUser, isDuplicateId, login } from "./user";
import { Form, EmailIdInput, PasswordInput } from "./common/Form";
import { SoftAlert, Button } from "./common/etc";

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
      <Button
        label="회원가입"
        handleClick={() => setView(<Join setIsLogin={setIsLogin} />)}
      />
      <Button
        label="로그인"
        handleClick={() => setView(<Login setIsLogin={setIsLogin} />)}
      />
    </div>
  );
  return view || init;
};

const Join = ({ setIsLogin }) => {
  const [joinErrMsg, setJoinErrMsg] = useState("");
  let id = "";
  const getId = (values) => {
    id = values.id;
  };

  return (
    <div>
      <h3>회원가입폼</h3>
      <SoftAlert message={joinErrMsg} />
      <Form
        title="회원가입"
        handleSubmit={(values) => {
          registUser(values.id, values.pw)
            ? setIsLogin(true)
            : setIsLogin(false);
        }}
        observer={getId}
      >
        <EmailIdInput />
        <Button
          label="중복검사"
          handleClick={(e) => {
            e.preventDefault();
            isDuplicateId(id, setJoinErrMsg);
          }}
        />
        <PasswordInput />
      </Form>
    </div>
  );
};

const Login = ({ setIsLogin }) => {
  const [loginErrMsg, setLoginErrMsg] = useState("");
  let inputs = {};
  const getInputs = (values) => {
    inputs = values;
  };

  const handleSubmit = (e) => {
    const loginWithInput = login(inputs.id, inputs.pw);
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
      <Form title="로그인" onSubmit={handleSubmit} observer={getInputs}>
        <EmailIdInput />
        <PasswordInput />
      </Form>
    </div>
  );
};

const Logout = ({ setIsLogin }) => {
  return <Button label="로그아웃" handleClick={() => setIsLogin(false)} />;
};

export default App;
