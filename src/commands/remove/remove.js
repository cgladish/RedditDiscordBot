import logger from "winston";

export const remove = async (channel, args) => {
  try {
  } catch (err) {
    logger.error(err.toString());
    channel.send("Failed to remove message(s)");
  }
};
