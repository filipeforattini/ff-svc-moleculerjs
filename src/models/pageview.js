const Sequelize = require("sequelize");

module.exports = {
  name: "pageviews",

  options: {
    paranoid: true,
  },

  define: {
    ip: Sequelize.STRING,
    page: Sequelize.STRING,
    query: Sequelize.STRING,
  },
};
