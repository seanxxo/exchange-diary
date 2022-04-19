const express = require("express");
const app = express();

const path = require("path");
const client = path.resolve("client/build");
const dummy = path.join(__dirname, "dummy");

app.use(express.static(client));

app.get("/", (_, response) => {
  response.sendFile(client + "/index.html");
});

app.get("/articles", (_, response) => {
  response.sendFile(path.join(dummy, "articles.json"));
});

app.post("/articles", (request, response) => {});

app.listen(8090);
