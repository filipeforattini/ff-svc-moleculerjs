const { ServiceBroker } = require("moleculer");

const api = require("./services/api.service");
const openapi = require("./services/swagger.service");
const leads = require("./services/leads.service");
const status = require("./services/status.service");
const cleaner = require("./services/cleaner.service");
const generator = require("./services/generator.service");
const pageviews = require("./services/pageviews.service");

module.exports = (config) => {
  const broker = new ServiceBroker(config);

  [
    api, 
    openapi, 
    leads, 
    status, 
    cleaner, 
    generator, 
    pageviews,
  ].map((svc) =>
    broker.createService(svc)
  );

  return broker;
};
