const CronMixin = require("../mixins/cron.mixin");

module.exports = {
  name: "status",
  mixins: [CronMixin],
  dependencies: ["leads", "pageviews"],

  actions: {
    async tick(ctx) {
      const [pageviews, leads] = await Promise.all([
        ctx.call("pageviews.count"),
        ctx.call("leads.count"),
      ]);

      this.logger.info(
        ` PAGEVIEWS ${pageviews}  -> LEADS ${leads}  (${(
          (leads / pageviews) *
          100
        ).toFixed(2)}% CONVERSION RATE)`
      );
    },
  },
};
