const Sequelize = require("sequelize", {logging: false});
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("pages", {
  title: { type: Sequelize.STRING, allowNull: false, unique: true },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM("open", "closed") },
});

Page.beforeValidate(async (page) => {
  console.log(page);
  page.slug = await generateSlug(page.title);
});

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

const User = db.define("users", {
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
});

module.exports = {
  db,
  Page,
  User,
};