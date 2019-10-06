import "@babel/polyfill";
import logger from "winston";
import "./bot";

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), { colorize: true });
logger.level = "debug";
