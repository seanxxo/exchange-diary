import Date from "./common/date";
import { GET } from "./server";

const getTodayArticlePair = async (loginUserIdx) => {
  const today = new Date("2022-02-16").removeTime();
  const pairs = await GET("/articles").then((articles) =>
    articles.filter((article) => new Date(article.date).removeTime() === today)
  );
  return {
    byUser: pairs.find((article) => article.write_user_idx === loginUserIdx),
    byPartner: pairs.find(
      (article) => article.recieve_user_idx === loginUserIdx
    ),
  };
};

const getNextArticles = async (preIdx, num) => {
  return await GET("/articles");
};

const postTodayArticle = () => true;

const getLastArticle = async () => {
  return await GET("/articles").then(
    (articles) => articles[articles.length - 1]
  );
};

export {
  getTodayArticlePair,
  getNextArticles,
  getLastArticle,
  postTodayArticle,
};
