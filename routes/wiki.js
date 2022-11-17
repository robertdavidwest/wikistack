const { Page, User } = require("../models");
let express = require("express");
let wikiRouter = express.Router();
let { addPage, wikiPage, main } = require("../views");

wikiRouter.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  console.log("!!!");
  console.log(Array.from(pages));
  console.log("!!!");
  res.send(main(pages));
});

wikiRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;

  try {
    const page = await Page.create({ title, content });
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

wikiRouter.get("/:slug", async (req, res, next) => {
  const page = await Page.findOne({ where: { slug: req.params.slug } });
  res.send(wikiPage(page, "Dave"));
});
module.exports = wikiRouter;
