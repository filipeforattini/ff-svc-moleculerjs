const Sequelize = require("sequelize");

module.exports = {
  name: "leads",

  options: {
    paranoid: true,
  },

  define: {
    ip: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    mobile: Sequelize.STRING,
    country: Sequelize.STRING,
    state: Sequelize.STRING,
    city: Sequelize.STRING,
    address: Sequelize.STRING,
  },
};
