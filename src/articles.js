import Date from "./common/date";

const apiInterface = {
  get: () => {},
  post: () => {},
  put: () => {},
  patch: () => {},
  delete: () => {},
};

const articles = {
  get: () => {
    return fetch("dummy/articles.json").then((response) => response.json());
  },
};

const getTodayArticlePair = async (loginUserIdx) => {
  const today = new Date("2022-02-16").removeTime();
  const pairs = await articles
    .get()
    .then((articles) =>
      articles.filter(
        (article) => new Date(article.date).removeTime() === today
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
  return await articles.get();
};

const postTodayArticle = () => true;

const getLastArticle = async () => {
  return await articles.get().then((articles) => articles[articles.length - 1]);
};

export {
  getTodayArticlePair,
  getNextArticles,
  getLastArticle,
  postTodayArticle,
};
