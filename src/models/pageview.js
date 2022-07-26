const { DataTypes } = require("sequelize");

module.exports = {
  name: "pageviews",

  options: {
    paranoid: true,
  },

  define: {
    ip: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    page: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    query: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
};
