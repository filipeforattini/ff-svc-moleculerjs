const Fakerator = require("fakerator");

const CronMixin = require("../mixins/cron.mixin");

const { GENERATOR_SIZE = "10" } = process.env;

module.exports = {
  name: "generator",
  mixins: [CronMixin],
  dependencies: ["leads", "pageviews"],

  settings: {
    packageSize: parseInt(GENERATOR_SIZE),
  },

  created() {
    this.faker = Fakerator("pt-BR");
  },

  actions: {
    tick() {
      return Promise.all(
        Array(this.settings.packageSize)
          .fill(null)
          .map(() => this.actions.package())
      );
    },

    package(ctx) {
      const pageview = this.randomPageview();
      this.broker.sendToQueue("pageviews.new", pageview);

      if (this.faker.random.number(100) <= 5) {
        const lead = this.randomLead();
        lead.ip = pageview.ip;
        this.broker.sendToQueue("leads.new", lead);
      }
    },
  },

  methods: {
    randomPageview() {
      return {
        ip: this.faker.internet.ip(),
        page: this.faker.internet.url(),
        query: `?q=${this.faker.lorem.word()}`,
      };
    },

    randomLead() {
      return {
        name: this.faker.names.name(),
        mobile: this.faker.phone.number(),
        email: this.faker.internet.email(),
        country: "Brazil",
        city: this.faker.address.city(),
        state: this.faker.address.state(),
        address: this.faker.address.street(),
      };
    },
  },
};
