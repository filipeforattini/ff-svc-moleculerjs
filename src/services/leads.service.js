const SequelizeAdapter = require("moleculer-db-adapter-sequelize");

const model = require("../models/lead");
const DBService = require('../mixins/db-service.mixin')

const { MYSQL_CONNECTION_STRING, POSTGRES_CONNECTION_STRING } = process.env;

module.exports = {
  name: "leads",
  mixins: [DBService],
  model,

  adapter: new SequelizeAdapter(
    MYSQL_CONNECTION_STRING || POSTGRES_CONNECTION_STRING
  ),

  events: {
    "amqp://leads.new"(payload) {
      return this.actions.create(payload);
    },
  },
};
