import logger from "winston";
import qs from "query-string";

import * as resources from "../resources";
import { queue } from "../queue";
import {
  getUrlFromVideo,
  createNowPlayingEmbed,
  createNothingIsPlayingEmbed
} from "../helpers";

export const nowPlaying = async (message, args) => {
  const { channel, member } = message;
  const { voiceChannel } = member;
  try {
    const video = queue.getCurrentVideo();
    const embed = video
      ? createNowPlayingEmbed(video)
      : createNothingIsPlayingEmbed();
    await channel.send(embed);
  } catch (err) {
    logger.error(err.toString());
    await channel.send("Failed to retrieve currently playing video.");
  }
};
