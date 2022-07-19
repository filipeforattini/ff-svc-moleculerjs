const dayjs = require('dayjs')

const CronMixin = require('../mixins/cron.mixin')

module.exports = {
  name: "cleaner",
  mixins: [ CronMixin],

  settings: {
    interval: '0 * * * * *'
  },

  actions: {
    tick (ctx) {
      this.logger.info('cleaning')
      const date = dayjs().subtract(2, 'minute').format('YYYY-MM-DD HH:mm:ss')

      return Promise.all([
        ctx.call("leads.removeOlderThan", { date }),
        ctx.call("pageviews.removeOlderThan", { date }),
      ])
    },
  },
};
