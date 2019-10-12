import axios from "axios";
import logger from "winston";
import ytdl from "ytdl-core";

import { getSearchResults } from "./play.requests";

export const play = async (message, args) => {
  const { channel, member } = message;
  const { voiceChannel } = member;
  try {
    if (!args.length) {
      return channel.send("You need to provide search strings!");
    }

    const searchResults = await getSearchResults(args);
    if (!searchResults.length) {
      return channel.send("No results for the provided search strings.");
    }

    const { videoId } = searchResults[0].id;
    const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
      filter: "audioonly"
    });

    const connection = await voiceChannel.join();
    const connectionDispatcher = connection.playStream(stream);
    connectionDispatcher.on("end", () => voiceChannel.leave());
  } catch (err) {
    logger.error(err.toString());
    await channel.send(
      "Failed to play audio from the provided search strings."
    );
  }
};
