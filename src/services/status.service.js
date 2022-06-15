const dayjs = require('dayjs')
const { CronJob } = require('cron')

const {
  TZ = "America/Sao_Paulo",
} = process.env

module.exports = {
  name: "status",
  settings: {
    interval: '* * * * * *'
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
    async tick (ctx) {
      
      const [
        pageviews,
        leads, 
      ] = await Promise.all([
        ctx.call("pageviews.count"),
        ctx.call("leads.count"),
      ])

      this.logger.info(` PAGEVIEWS ${pageviews}  -> LEADS ${leads}  (${((leads/pageviews)*100).toFixed(2)}% CONVERSION RATE)`)
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
