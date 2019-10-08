require("dotenv").config();
require("@babel/polyfill");
require("./lib/bot");
require("./lib/pgClient");

const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), { colorize: true });
logger.level = "debug";

// This is so the app can run on heroku
if (process.env.NODE_ENV === "production") {
  const http = require("http");
  http
    .createServer((req, res) => {
      res.write("App is running");
      res.end();
    })
    .listen(process.env.PORT);
}
