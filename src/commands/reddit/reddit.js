import snoowrap from "snoowrap";
import logger from "winston";

import bot from "../../bot";
import { PAGE_SIZE, createImageEmbed } from "./reddit.helpers";
import {
  getSubreddit,
  getSubmission,
  addSubreddit,
  addSubmission,
  setSubredditViewedIndex
} from "./reddit.queries";

const snooWrap = new snoowrap({
  userAgent: "owo-bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

export const reddit = async (channel, args) => {
  try {
    if (!args.length) {
      return channel.send("You need to provide a subreddit to fetch from!");
    }

    const subreddit = args[0].toLowerCase();
    const subredditInDb = await getSubreddit(subreddit);
    if (!subredditInDb) {
      await addSubreddit(subreddit);
    }
    const viewedIndex = subredditInDb ? subredditInDb.viewed_index : 0;

    const posts = await snooWrap
      .getSubreddit(subreddit)
      .getTop({ time: "all", count: PAGE_SIZE, after: viewedIndex });
    if (!posts.length) {
      throw new Error("No posts left in the subreddit");
    }

    for (let i = 0; i < PAGE_SIZE; ++i) {
      const post = posts[i];
      if (post) {
        const postInDb = await getSubmission(post.id, subreddit);
        if (!postInDb) {
          await Promise.all([
            setSubredditViewedIndex(subreddit, viewedIndex + i + 1),
            addSubmission(post.id, subreddit)
          ]);
          const embed = createImageEmbed(post);
          if (embed) {
            await channel.send(embed);
            return;
          }
        }
      }
    }

    channel.send("I searched a page of posts and didn't find any images :/");
  } catch (err) {
    logger.error(err.toString());
    channel.send("Failed to retrieve post from the subreddit.");
  }
};
