import Discord from "discord.js";

export const createEmbed = () => {
  return new Discord.RichEmbed()
    .setColor("#FFB6C1")
    .setFooter("https://github.com/cgladish/OwOBot")
    .setTimestamp();
};
