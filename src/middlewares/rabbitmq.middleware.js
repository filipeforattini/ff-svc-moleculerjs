const _ = require("lodash");
const amqplib = require("amqplib");

const decoupleNames = (eventName) => {
  const queue = eventName.replace("amqp://", "");
  const names = queue.split(".");

  if (names.length <= 1)
    return {
      exchange: eventName,
      routingKey: "",
    };

  const routingKey = names.pop();

  return {
    exchange: names.join(),
    routingKey,
    queue,
  };
};

const addConnectionEvents = (connection) => {
  connection
    .on("error", (err) => {
      this.logger.error("AMQP connection error.", err);
    })
    .on("close", (err) => {
      this.logger.error("AMQP connection is closed.", err);
    })
    .on("blocked", (reason) => {
      this.logger.warn("AMQP connection is blocked.", reason);
    })
    .on("unblocked", () => {
      this.logger.info("AMQP connection is unblocked.");
    });
};

const addChannelEvents = (channel) => {
  channel
    .on("close", () => {
      this.logger.error("AMQP channel closed.");
    })
    .on("error", (err) => {
      this.logger.error("AMQP channel error", err);
    })
    .on("drain", () => {
      this.logger.info("AMQP channel is drained.");
    })
    .on("return", (msg) => {
      this.logger.warn("AMQP channel returned a message.", msg);
    });
};

module.exports = (options = {}) => {
  const { autoAck = true, uri = "amqp://localhost", prefetch = 3 } = options;
  let myBroker = null;

  return {
    async created(broker) {
      myBroker = broker;

      this.logger.info("Connecting to AMQP server...");
      broker.amqpConnection = await amqplib.connect(uri);

      addConnectionEvents(broker.amqpConnection);
      this.logger.info("AMQP is connected.");

      this.logger.debug(`Creating AMQP channel...`);
      broker.amqpChannel = await broker.amqpConnection.createChannel();

      addChannelEvents(broker.amqpChannel)
      broker.amqpChannel.prefetch(prefetch);

      broker.sendToQueue = (queue, content) => {
        const { exchange, routingKey } = decoupleNames(queue);
        content = Buffer.from(JSON.stringify(content), "utf-8");

        myBroker.amqpChannel.assertExchange(exchange, "fanout");
        myBroker.amqpChannel.publish(exchange, routingKey, content);
      };
    },

    async serviceStarted(service) {
      const amqpEvents = Object.keys(service.events).filter((event) =>
        event.startsWith("amqp://")
      );

      if (amqpEvents.length === 0) return service;

      this.logger.warn(`service ${service.name.toUpperCase()} has AMQP events`);

      // create exchanges
      await Promise.all(
        amqpEvents
          .map((event) => decoupleNames(event).exchange)
          .map((exchange) => myBroker.amqpChannel.assertExchange(exchange, "fanout"))
      );

      // create queues
      amqpEvents.forEach(async (event) => {
        const { exchange, routingKey, queue } = decoupleNames(event);

        await myBroker.amqpChannel.assertQueue(queue, { autoDelete: true });
        await myBroker.amqpChannel.bindQueue(queue, exchange, routingKey);

        if (autoAck) {
          // emits as an event and acknowledges
          myBroker.amqpChannel.consume(queue, async (payload) => {
            const { content } = payload;
            await myBroker.emit(event, JSON.parse(content));
            myBroker.amqpChannel.ack(payload);
          });
        } else {
          // use the event function as consumer callback
          myBroker.amqpChannel.consume(queue, service.events[event]);
        }
      });

      // return new schema
      return service;
    },
  };
};
