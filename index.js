const App = require('./src/app')

const config = require("./moleculer.config");

App(config)
  .start()
  // .then(() => broker.call("math.add", { a: 5, b: 3 }))
  // .then((res) => console.log("5 + 3 =", res))
  // .catch((err) => console.error(`Error occured! ${err.message}`));
