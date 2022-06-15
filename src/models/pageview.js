const Sequelize = require("sequelize");

module.exports = {
  name: "pageviews",

  define: {
    ip: Sequelize.STRING,
    page: Sequelize.STRING,
    query: Sequelize.STRING,
  },

  options: {
    // Options from http://docs.sequelizejs.com/manual/tutorial/models-definition.html
  },
}
