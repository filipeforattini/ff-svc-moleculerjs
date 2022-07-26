const { DataTypes } = require("sequelize");

module.exports = {
  name: "leads",

  options: {
    paranoid: true,
  },

  define: {
    ip: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
};
