const dayjs = require('dayjs')
const { CronJob } = require('cron')

const {
  TZ = "America/Sao_Paulo",
} = process.env

module.exports = {
  name: "cleaner",
  settings: {
    interval: '0 * * * * *'
  },

  created () {
    this.job = this.createJob()
    this.logger.info('job created')
  },

  async started () {
    this.job.start()
    this.logger.info('job started')
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

  methods: {
    createJob () {
      return new CronJob(this.settings.interval,
        function () { this.actions.tick() }.bind(this),
        null,
        false,
        TZ
      )
    },
  },
};
