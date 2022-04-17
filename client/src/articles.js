import Date from "./common/Date";

const tmpToday = new Date("2022-02-16").removeTime();

const articles = {
  get() {
    return fetch("/articles").then((response) => response.json());
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
