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

wikiRouter.get("/:slug", async (req, res, next) => {
  const page = await Page.findOne({ where: { slug: req.params.slug } });
  // res.json(page);
  // wikiPage(page, 'yourName');
  console.log(page);
  wikiPage(page, "Dave");
});
module.exports = wikiRouter;
