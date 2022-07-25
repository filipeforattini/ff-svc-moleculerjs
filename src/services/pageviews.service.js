const SequelizeAdapter = require("moleculer-db-adapter-sequelize");

const model = require("../models/pageview");
const DBService = require("../mixins/db-service.mixin");

const { MYSQL_CONNECTION_STRING, POSTGRES_CONNECTION_STRING } = process.env;

module.exports = {
  name: "pageviews",
  mixins: [DBService],
  model,

  adapter: new SequelizeAdapter(
    POSTGRES_CONNECTION_STRING || MYSQL_CONNECTION_STRING
  ),

  events: {
    async "amqp://pageviews.new"(pageview) {
      return this.actions.create(pageview);
    },
  },
};
