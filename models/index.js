const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

module.exports = {
  db,
};

const Page = db.define("pages", {
  title: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING },
  content: { type: Sequelize.TEXT },
  status: { type: Sequelize.BOOLEAN },
});
