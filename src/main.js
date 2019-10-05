import "@babel/polyfill";
import logger from "winston";
import * as commands from "./commands";
import bot from "./bot";

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), { colorize: true });
logger.level = "debug";

bot.once("ready", evt => {
  logger.info("Bot logged in!");
});

bot.on("message", message => {
  const splitMessage = message.content.split(" ");
  if (!splitMessage.length || splitMessage[0].toLowerCase() !== "owo") {
    return;
  }

  const command = splitMessage[1];
  const args = splitMessage.slice(2, splitMessage.length);

  switch (command) {
    case "r":
    case "reddit":
      return commands.reddit(message.channel, args);
    default:
      message.channel.send("I don't understand this command :(");
  }
});
