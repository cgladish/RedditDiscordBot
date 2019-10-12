import logger from "winston";
import qs from "query-string";

import * as resources from "../resources";
import { queue } from "../queue";
import {
  getUrlFromVideo,
  createNowPlayingEmbed,
  createQueuedEmbed
} from "../helpers";

export const play = async (message, args) => {
  const { channel, member } = message;
  const { voiceChannel } = member;
  try {
    if (!args.length) {
      return channel.send("You need to provide a list of keywords!");
    }
    if (!voiceChannel) {
      return channel.send(
        "You must be in a voice channel to use this command."
      );
    }

    let video;
    if (args[0].includes("youtube.com")) {
      const queryParams = qs.parse(args[0].split("?")[1]);
      video = await resources.getVideo(queryParams.v);
    } else {
      const searchResults = await resources.getSearchResults(args);
      video = searchResults[0];
    }
    if (!video) {
      return channel.send("No results found.");
    }

    const embed = queue.getCurrentVideo()
      ? createQueuedEmbed(video)
      : createNowPlayingEmbed(video);

    await queue.add(voiceChannel, video);
    await channel.send(embed);
  } catch (err) {
    logger.error(err.toString());
    await channel.send("❌Failed to play video.");
  }
};
