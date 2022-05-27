import Date from "./common/Date";

const tmpToday = new Date("2022-02-16").removeTime();
const tmpUserIdx = 1;

const articles = {
  get() {
    return fetch("/articles").then((response) => response.json());
  },
  post(content) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articles: { content: content },
        user: { user_idx: tmpUserIdx },
      }),
    };
    return fetch("/articles", option).then((response) => response.json());
  },
  delete(articles_idx) {
    const option = {
      method: "DELETE",
    };
    return fetch(`/articles/${articles_idx}`, option).then((response) =>
      response.json()
    );
  },
};

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

const postTodayArticle = (input) => {
  return articles.post(input.content);
};

const getLastArticle = () => {
  return articles.get().then((articles) => articles[articles.length - 1]);
};

const deleteArticle = (article) => {
  return articles.delete(article.articles_idx);
};

export {
  getTodayArticlePair,
  getNextArticles,
  getLastArticle,
  postTodayArticle,
  deleteArticle,
};
