const { Page, User } = require("../models");
let express = require("express");
let wikiRouter = express.Router();
let { addPage } = require("../views");
let { wikiPage } = require("../views");

wikiRouter.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

wikiRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;

  try {
    const page = await Page.create({ title, content });
  } catch (error) {
    next(error);
  }
  res.redirect("/");
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = wikiRouter;
