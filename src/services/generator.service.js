const { CronJob } = require('cron')
const Fakerator = require("fakerator")

const {
  TZ = "America/Sao_Paulo",
} = process.env

module.exports = {
  name: "generator",
  settings: {
    interval: '* * * * * *'
  },

  created () {
    this.job = this.createJob()
    this.logger.info('job created')
    this.faker = Fakerator('pt-BR')
  },

  async started () {
    this.job.start()
    this.logger.info('job started')
  },

  actions: {
    tick (ctx) {
      const pageview = this.createPageview()
      this.broker.sendToChannel("pageviews.new", pageview);
      
      if (this.faker.random.number(10) === 0) {
        const lead = this.createLead()
        lead.ip = pageview.ip
        this.broker.sendToChannel("leads.new", lead);
      }
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

    createLead () {
      return {
        name: this.faker.names.name(),
        mobile: this.faker.phone.number(),
        country: 'Brazil',
        city: this.faker.address.city(),
        state: this.faker.address.state(),
        address: this.faker.address.street(),
      }
    },

    createPageview () {
      return {
        ip: this.faker.internet.ip(),
        page: this.faker.internet.url(),
        query: `?q=${this.faker.lorem.word()}`,
      }
    }
  },
};
