const { Middleware } = require("@moleculer/channels");

const {
  // generic config
  MOLECULER_CACHER,
  MOLECULER_TRANSPORTER,
  MOLECULER_REGISTRY,
  MOLECULER_CHANNEL,
  // specific config
  REDIS_CONNECTION_STRING,
  NATS_CONNECTION_STRING,
  ETCD_CONNECTION_STRING,
  RABBITMQ_CONNECTION_STRING,
} = process.env;

module.exports = {
  hotReload: true,
  cacher: REDIS_CONNECTION_STRING || MOLECULER_CACHER,
  transporter: NATS_CONNECTION_STRING || MOLECULER_TRANSPORTER,
  registry: {
    discoverer: ETCD_CONNECTION_STRING || MOLECULER_REGISTRY,
  },
  middlewares: [
    Middleware({ adapter: RABBITMQ_CONNECTION_STRING || REDIS_CONNECTION_STRING || MOLECULER_CHANNEL }),
  ],
};
