import { useState, useEffect } from "react";
import { registUser, isDuplicateId, login } from "./user";
import { Form, EmailIdInput, PasswordInput, Input } from "./common/Form";
import { SoftAlert, Button } from "./common/etc";
import {
  getNextArticles,
  getTodayArticlePair,
  getLastArticle,
  postTodayArticle,
  deleteArticle,
} from "./articles";

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

const Content = () => {
  console.log(`render Content`);
  return (
    <div>
      <h3>접속 첫 화면</h3>
      <TodayArticlePair />
      <PastArticles />
    </div>
  );
};

const TodayArticlePair = () => {
  const [todayArticlePair, setTodayArticlePair] = useState({
    byUser: null,
    byPartner: null,
  });
  const [view, setView] = useState();
  const loginUser = 1;
  useEffect(() => {
    if (!Object.values(todayArticlePair).every((value) => value !== null)) {
      getTodayArticlePair(loginUser).then((pair) => {
        setTodayArticlePair(pair);
      });
    }
  });
  const init = (
    <Button
      label="오늘 일기 쓰기"
      handleClick={() => {
        setView(postForm);
      }}
    />
  );
  const postForm = (
    <Form
      title="글쓰기"
      handleSubmit={(values) =>
        postTodayArticle(values).then((result) => {
          if (result) {
            getTodayArticlePair(loginUser).then((pair) => {
              setTodayArticlePair(pair);
            });
          }
        })
      }
    >
      <Input name="content" type="textarea" isRequired={true} />
      <Button label="취소" handleClick={() => setView(init)} />
    </Form>
  );

  return (
    <div>
      {todayArticlePair.byUser ? (
        <Article article={todayArticlePair.byUser} />
      ) : (
        view || init
      )}
      {todayArticlePair.byPartner ? (
        <Article
          article={todayArticlePair.byPartner}
          coveredMsg={"n분 후 열람 가능..."}
        />
      ) : (
        <Button label="독촉하기" />
      )}
    </div>
  );
};

const PastArticles = () => {
  const [articles, setArticles] = useState([]);
  const [msg, setMsg] = useState("");
  const getMore = () => {
    const lastIdx = articles.length
      ? articles[articles.length - 1].articles_idx
      : getLastArticle().then((article) => article.articles_idx);
    getNextArticles(lastIdx, 5).then((more) => {
      more[0]
        ? setArticles([...articles, ...more])
        : setMsg("더 불러올 글이 없음");
    });
  };

  return (
    <ul>
      <SoftAlert message={msg} />
      {articles.map((article) => (
        <li key={article.articles_idx}>
          <Article article={article} />
        </li>
      ))}
      <Button label="글 5개 불러오기" handleClick={getMore} />
    </ul>
  );
};

const Article = ({ article, coveredMsg }) => {
  if (!article) return null;
  return (
    <div>
      {article.articles_idx}
      <Button label="❌" handleClick={() => deleteArticle(article)} />
      <br />
      {coveredMsg}
    </div>
  );
};
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
          handleClick={() => {
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

  const handleSubmit = (submitValues) => {
    const loginWithInput = login(submitValues.id, submitValues.pw);
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
      <Form title="로그인" handleSubmit={handleSubmit} observer={getInputs}>
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
