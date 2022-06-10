const { Middleware } = require("@moleculer/channels");

const {
  MOLECULER_CACHER,
  MOLECULER_TRANSPORTER,
  MOLECULER_REGISTRY,
  MOLECULER_CHANNEL,
} = process.env;

module.exports = {
  cacher: MOLECULER_CACHER,
  transporter: MOLECULER_TRANSPORTER,
  registry: {
    discoverer: MOLECULER_REGISTRY,
  },
  middlewares: [
    Middleware({ adapter: MOLECULER_CHANNEL }),
  ],
};
