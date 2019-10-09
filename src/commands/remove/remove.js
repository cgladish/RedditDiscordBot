import logger from "winston";

const FETCH_MESSAGES_LIMIT = 100;

export const remove = async (message, args) => {
  const { channel } = message;
  try {
    const numPostsAgoString = args[0];
    const numPostsToRemoveString = args[1];
    if (!numPostsAgoString || !numPostsToRemoveString) {
      return channel.send(
        "You need to provide the # of posts ago to start at and the # of posts to remove!"
      );
    }

    const numPostsAgo = parseInt(numPostsAgoString, 10);
    const numPostsToRemove = parseInt(numPostsToRemoveString, 10);
    const numMessagesToFetch = numPostsAgo + numPostsToRemove;

    const messages = [];
    for (let i = 0; i < numMessagesToFetch; i += FETCH_MESSAGES_LIMIT) {
      const fetchArgs = {
        limit: Math.min(numMessagesToFetch - i, FETCH_MESSAGES_LIMIT)
      };
      if (messages.length) {
        fetchArgs.after = messages[messages.length - 1].id;
      }

      const fetchedMessages = (await channel.fetchMessages(fetchArgs)).array();
      messages.push(...fetchedMessages);
    }

    const messagesToDelete = messages.slice(numPostsAgo, numMessagesToFetch);
    await channel.bulkDelete(messagesToDelete);

    await channel.send("Successfully deleted message(s)!");
  } catch (err) {
    logger.error(err.toString());
    await channel.send("Failed to remove message(s)");
  }
};
