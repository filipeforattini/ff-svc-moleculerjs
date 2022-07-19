const { CronJob } = require('cron')

const {
  TZ = "America/Sao_Paulo",
} = process.env

module.exports = {
  name: "cron",

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
    tick (ctx) {
      this.logger.info('overwrite me!')
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
