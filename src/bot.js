import Discord from "discord.js";
import logger from "winston";

import * as commands from "./commands";
import { createEmbed } from "./util/createEmbed";

const bot = new Discord.Client();
bot.login(process.env.DISCORD_TOKEN);

bot.once("ready", evt => {
  logger.info("Bot logged in!");
});

bot.on("message", message => {
  const splitMessage = message.content.split(" ").filter(elem => elem);
  if (
    !splitMessage.length ||
    splitMessage[0].toLowerCase() !== process.env.COMMAND
  ) {
    return;
  }

  const command = splitMessage[1] || null;
  const args = splitMessage.slice(2, splitMessage.length);

  switch (command) {
    case "r":
    case "reddit":
      commands.reddit(message.channel, args);
      break;
    case "rem":
    case "remove":
      commands.remove(message.channel, args);
      break;
    case "help":
    case null:
      const embed = createEmbed()
        .setTitle("Available Commands List")
        .addField(
          "(r | reddit) [subreddit]",
          "Fetch a top post from the supplied [subreddit]."
        )
        .addField(
          "(rem | remove) [# of posts ago] [# of posts to remove]",
          "Remove [# of posts to remove] starting from the post [# of posts ago]."
        );
      message.channel.send(embed);
      break;
    default:
      message.channel.send("I don't understand this command :(");
  }
});

export default bot;
