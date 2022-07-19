const Swagger = require("moleculer-swagger");

module.exports = {
  name: "swagger",

  mixins: [
    Swagger({
      openapiSchema: {
        openapi: "3.0.3",
        info: {
          title: "The title of the API.",
          description:
            "A short description of the API. CommonMark syntax MAY be used for rich text representation.",
          termsOfService: "http://swagger.io/terms/",
          contact: {
            email: "apiteam@swagger.io",
          },
          license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html",
          },
          version: "3.0.3",
        },
        components: {
          responses: {
            Success: {
              description: "Successful operation",
              content: {
                "application/json": { schema: { type: "string" } },
                "text/html": { schema: { type: "string" } },
              },
            },
            Unauthorized: {
              description: "Unauthorized",
            },
            NotFound: {
              description: "The specified resource was not found",
            },
            ServiceUnaviable: {
              description: "Service Unaviable",
            },
          },
        },
      },
      defaults: {
        responses: {
          200: {
            $ref: "#/components/responses/Success",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          503: { $ref: "#/components/responses/ServiceUnaviable" },
        },
      },
    }),
  ],
};
