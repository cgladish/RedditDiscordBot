require("dotenv").config();
require("@babel/polyfill");
require("./lib/bot");
require("./lib/pgClient");

const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), { colorize: true });
logger.level = "debug";

// This is so the app can run on heroku
if (process.env.NODE_ENV === "prod") {
  const http = require("http");
  http
    .createServer((req, res) => {
      res.write("App is running");
      res.end();
    })
    .listen(process.env.PORT);
  // Ping self to keep dyno awake
  const THIRTY_MINUTES = 1800000;
  setInterval(function() {
    http.get(`http://${process.env.HEROKU_APP_NAME}.herokuapp.com/`);
  }, THIRTY_MINUTES);
}
