import Date from "./common/Date";

const tmpToday = new Date("2022-02-16").removeTime();

const articles = {
  get() {
    return fetch("/articles").then((response) => response.json());
  },
  post(content) {
    const option = {
      method: "POST",
      // mode: 'cors', // no-cors, cors, *same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        articles: {
          content: content,
        },
        // 유저 정보는 전역에
        user: { user_idx: 1 },
      }),
    };
    return fetch("/articles", option).then((response) => {
      console.log(response);
    });
  },
  delete(articles_idx) {
    const option = {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({
      //   articles: {
      //     articles_idx: articles_idx,
      //   },
      // }),
    };
    return fetch(`/articles/${articles_idx}`, option).then((response) =>
      console.log(response)
    );
  },
};

articles.post("Form에 입력된...text~~");
articles.delete(1);

const getTodayArticlePair = async (loginUserIdx) => {
  const pairs = await articles
    .get()
    .then((articles) =>
      articles.filter(
        (article) => new Date(article.date).removeTime() === tmpToday
      )
    );
  return {
    byUser: pairs.find((article) => article.write_user_idx === loginUserIdx),
    byPartner: pairs.find(
      (article) => article.recieve_user_idx === loginUserIdx
    ),
  };
};

const getNextArticles = async (preIdx, num) => {
  return articles.get().then((articles) =>
    articles
      .filter((article) => new Date(article.date).removeTime() !== tmpToday)
      .sort((a, b) => {
        if (a.articles_idx < b.articles_idx) {
          return 1;
        }
        if (a.articles_idx > b.articles_idx) {
          return -1;
        }
        return 0;
      })
      .reduce((pre, article) => {
        if (pre.length === num) return pre;
        if (article.articles_idx >= preIdx) return pre;
        return [...pre, article];
      }, [])
  );
};

const postTodayArticle = () => true;

const getLastArticle = () => {
  return articles.get().then((articles) => articles[articles.length - 1]);
};

export {
  getTodayArticlePair,
  getNextArticles,
  getLastArticle,
  postTodayArticle,
};
