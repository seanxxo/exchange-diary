const articles = {
  articles_idx: Number(),
  date: String(),
  write_user_idx: Number(),
  recieve_user_idx: Number(),
  content: String(),
  is_read: Boolean(),
  is_reply: Boolean(),
};
const user = {
  user_idx: Number(),
  join_date: Date(),
  id: String(),
  pw: String(),
  matched_user_idx: Number(),
};

exports.articlesInterface = articles;
exports.userInterface = user;
