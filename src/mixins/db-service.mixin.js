const _ = require('lodash')
const Sequelize = require("sequelize");
const DbService = require("moleculer-db");

module.exports = _.merge(DbService, {
  actions: {
    removeOlderThan(ctx) {
      const { date } = ctx.params;

      return this.adapter.model.destroy({
        where: {
          createdAt: {
            [Sequelize.Op.lte]: date,
          },
        },
      });
    },
  },
})