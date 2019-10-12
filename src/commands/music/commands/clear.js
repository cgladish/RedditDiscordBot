import logger from "winston";
import qs from "query-string";

import * as resources from "../resources";
import { queue } from "../queue";
import { createClearedEmbed } from "../helpers";

export const clear = async (message, args) => {
  const { channel, member } = message;
  const { voiceChannel } = member;
  try {
    queue.clear();
    await channel.send(createClearedEmbed());
  } catch (err) {
    logger.error(err.toString());
    await channel.send("❌Failed to clear the queue.");
  }
};
