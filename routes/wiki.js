const { Page, User } = require("../models");
let express = require("express");
let wikiRouter = express.Router();
let { addPage, editPage, wikiPage, main } = require("../views");

wikiRouter.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

wikiRouter.post("/", async (req, res, next) => {
  try {
    const { title, content, status, author, email } = req.body;
    const page = await Page.create({ title, content, status });
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: author,
        email: email,
      },
    });

    await page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

wikiRouter.put("/:slug", async (req, res, next) => {
  try {
    const { title, content, status } = req.body;
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    const slug = ""; // handled in hooks
    const updatedPage = await page.update({ title, slug, content, status });
    res.redirect(`/wiki/${updatedPage.slug}`);
  } catch (error) {}
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

async function getPageAndAuthor(slug) {
  const page = await Page.findOne({
    where: { slug: slug },
    // include: "author", // another way to get the author (Eager loading)
  });

  // using the recommended way here:
  const author = page ? await page.getAuthor() : undefined;
  return [page, author];
}

wikiRouter.get("/:slug", async (req, res, next) => {
  try {
    const [page, author] = await getPageAndAuthor(req.params.slug);
    if (!page) res.status(404).send("Page Not Found");
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

wikiRouter.get("/:slug/edit", async (req, res, next) => {
  try {
    const [page, author] = await getPageAndAuthor(req.params.slug);
    if (!page) res.status(404).send("Page Not Found");
    res.send(editPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = wikiRouter;
