const express = require("express");
const morgan = require("morgan");
const wikiRouter = require(`./routes/wiki`);
const userRouter = require(`./routes/users`);
const { db, Page, User } = require("./models");
const app = express();
const layout = require("./views/layout");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use("/wiki", wikiRouter);
// app.use('/users', usersRouter)

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

const port = 1337;

const init = async () => {
  await db.sync({ force: false });

  app.listen(port, () => {
    console.log("App listening");
  });
};

init();

db.authenticate().then(() => {
  console.log("connected to the database");
});
