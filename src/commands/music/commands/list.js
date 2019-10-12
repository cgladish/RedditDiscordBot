import logger from "winston";
import qs from "query-string";

import * as resources from "../resources";
import { queue } from "../queue";
import { createListEmbed } from "../helpers";

export const list = async (message, args) => {
  const { channel, member } = message;
  const { voiceChannel } = member;
  try {
    const videos = queue.getVideos();
    await channel.send(createListEmbed(videos));
  } catch (err) {
    logger.error(err.toString());
    await channel.send("❌Failed to retrieve the queue of videos.");
  }
};
