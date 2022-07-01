const Sequelize = require("sequelize");
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

const model = require("../models/lead");

const { 
  MYSQL_CONNECTION_STRING,
  POSTGRES_CONNECTION_STRING,
} = process.env;

module.exports = {
  name: "leads",
  mixins: [DbService],
  model,
  adapter: new SqlAdapter(MYSQL_CONNECTION_STRING || POSTGRES_CONNECTION_STRING),

  channels: {
    async "leads.new" (payload) {
      this.actions.create(payload)
    },
  },

  actions: {
    removeOlderThan (ctx) {
      const { date } = ctx.params
      
      return this.adapter.model.destroy({
        where: {
          createdAt: {
            [Sequelize.Op.lte]: date,
          }
        }
      })
    }
  }
};
