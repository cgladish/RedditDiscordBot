import Discord from "discord.js";
import auth from "../auth.json";

const bot = new Discord.Client();
bot.login(auth["discord"]["token"]);

export default bot;
