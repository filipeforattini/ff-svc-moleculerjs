const Fakerator = require("fakerator")

const CronMixin = require('../mixins/cron.mixin')

module.exports = {
  name: "generator",
  mixins: [ CronMixin],

  created () {
    this.faker = Fakerator('pt-BR')
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
