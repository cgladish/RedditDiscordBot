require("dotenv").config();
require("@babel/polyfill");
require("./lib/bot");

const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), { colorize: true });
logger.level = "debug";
