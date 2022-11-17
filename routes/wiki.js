const { Page } = require("../models");
let express = require("express");
let wikiRouter = express.Router();
let { addPage } = require("../views");
let { wikiPage } = require("../views");

wikiRouter.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

wikiRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const slug = generateSlug(title);
  const content = req.body.content;
  try {
    const page = await Page.create({ title, slug, content });
  } catch (error) {
    next(error);
  }
  res.redirect("/");
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = wikiRouter;
