const ApiService = require("moleculer-web");

const { PORT = "8080" } = process.env;

module.exports = {
  name: "status",
  mixins: [ApiService],

  settings: {
    port: parseInt(PORT),

    cors: {
      methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
      origin: "*",
    },

    assets: {
      folder: "public",
    },

    routes: [
      {
        path: "/swagger.json",
        aliases: {
          "GET /": "swagger.openapi",
        },
      },
      {
        autoAliases: true,
        whitelist: ["**"],
        path: "/",
        aliases: {
          "REST /pageviews": "pageviews",
          "REST /leads": "leads",
        },
      },
    ],
  },
};
