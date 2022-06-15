const Sequelize = require("sequelize");

module.exports = {
  name: "leads",

  define: {
    ip: Sequelize.STRING,
    name: Sequelize.STRING,
    mobile: Sequelize.STRING,
    country: Sequelize.STRING,
    state: Sequelize.STRING,
    city: Sequelize.STRING,
    address: Sequelize.STRING,
  },

  options: {
    // Options from http://docs.sequelizejs.com/manual/tutorial/models-definition.html
  },
}
