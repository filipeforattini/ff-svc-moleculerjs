const RabbitMQ = require("./src/middlewares/rabbitmq.middleware");

const {
  // generic config
  MOLECULER_CACHER,
  MOLECULER_TRANSPORTER,
  MOLECULER_REGISTRY,

  // specific config
  REDIS_CONNECTION_STRING,
  NATS_CONNECTION_STRING,
  ETCD_CONNECTION_STRING,

  RABBITMQ_CONNECTION_STRING,
  RABBITMQ_PREFETCH = "3",
} = process.env;

module.exports = {
  hotReload: true,
  cacher: REDIS_CONNECTION_STRING || MOLECULER_CACHER,
  transporter: NATS_CONNECTION_STRING || MOLECULER_TRANSPORTER,

  registry: {
    discoverer: ETCD_CONNECTION_STRING || MOLECULER_REGISTRY,
  },

  middlewares: [
    RabbitMQ({
      uri: RABBITMQ_CONNECTION_STRING,
      prefetch: parseInt(RABBITMQ_PREFETCH),
    }),
  ],
};
