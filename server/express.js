const express = require("express");
const app = express();

const path = require("path");
const client = path.resolve("client/build");

app.use(express.static(client));
app.use(express.json());

app.get("/", (_, response) => {
  response.sendFile(client + "/index.html");
});

const fs = require("fs");
const { articlesInterface } = require("./dbObj");

const local = {
  id: "",
  dummys: ["articles.json", "matched.json", "user.json"],
  getPath(fileName) {
    return path.join(__dirname, "dummy", this.id, fileName);
  },

  init(id) {
    if (this.id) return;
    this.id = id;
    fs.mkdirSync(path.join(__dirname, "dummy", this.id));
    this.dummys.forEach((fileName) => {
      fs.copyFileSync(
        path.join(__dirname, "dummy", fileName),
        this.getPath(fileName)
      );
    });
  },

  readJson(fileName) {
    return JSON.parse(
      fs.readFileSync(this.getPath(fileName), "utf8").replace(/'/g, '"')
    );
  },

  writeJson(fileName, json) {
    fs.writeFileSync(this.getPath(fileName), JSON.stringify(json), (err) => {
      if (err) {
        throw err;
      }
    });
  },
};

const articles = {
  file: "articles.json",
  tmpToday: "2022-02-16",
  tmpUser: {
    user_idx: 1,
    join_date: "2022-02-13",
    id: "user1@mail.com",
    pw: "user1",
    matched_user_idx: 3,
  },
  select() {
    return local.readJson(this.file);
  },
  insert(articles, user) {
    user = this.tmpUser;
    local.writeJson(this.file, [
      ...local.readJson(this.file),
      {
        ...articlesInterface,
        ...articles,
        write_user_idx: user.user_idx,
        receive_user_idx: user.matched_user_idx,
        date: this.tmpToday,
      },
    ]);
    return true;
  },
  delete(articles_idx) {
    local.writeJson(
      this.file,
      local
        .readJson(this.file)
        .filter(
          (preArticle) => preArticle.articles_idx !== Number(articles_idx)
        )
    );
    return true;
  },
};

app.get("/articles", (_, response) => {
  response.send(articles.select());
});

app.post("/articles", (request, response) => {
  response.send(articles.insert(request.body.articles, request.body.user));
});

app.delete("/articles/:articles_idx", (request, response) => {
  response.send(articles.delete(request.params.articles_idx));
});

app.listen(8090, () => {
  const id = new Date().toLocaleString().replace(new RegExp("\\:", "g"), ".");
  local.init(id);
});
