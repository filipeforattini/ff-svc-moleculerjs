const Sequelize = require("sequelize");
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

const model = require('../models/pageview')

const {
  POSTGRES_CONNECTION_STRING
} = process.env

module.exports = {
  name: "pageviews",
  mixins: [DbService],
  model,
  adapter: new SqlAdapter(POSTGRES_CONNECTION_STRING),
  
  channels: {
    async "pageviews.new" (payload) {
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
