const tmp = [
  {
    articles_idx: 1,
    date: "2022-02-13",
    write_user_idx: 1,
    recieve_user_idx: 2,
    content: "",
    is_read: true,
    is_reply: true,
  },
  {
    articles_idx: 2,
    date: "2022-02-13",
    write_user_idx: 2,
    recieve_user_idx: 1,
    content: "",
    is_read: true,
    is_reply: true,
  },
  {
    articles_idx: 3,
    date: "2022-02-14",
    write_user_idx: 1,
    recieve_user_idx: 2,
    content: "",
    is_read: true,
    is_reply: false,
  },
  {
    articles_idx: 4,
    date: "2022-02-16",
    write_user_idx: 1,
    recieve_user_idx: 3,
    content: "",
    is_read: true,
    is_reply: true,
  },
  {
    articles_idx: 5,
    date: "2022-02-16",
    write_user_idx: 3,
    recieve_user_idx: 1,
    content: "",
    is_read: true,
    is_reply: false,
  },
];
const getTodayArticlePair = () => ({
  users: null,
  matches: tmp[tmp.length - 1],
});

const getNextArticles = (preIdx, num) => tmp;

const postTodayArticle = () => true;

export { getTodayArticlePair, getNextArticles, postTodayArticle };