import snoowrap from "snoowrap";
import logger from "winston";

import bot from "../../bot";
import { PAGE_SIZE, createImageEmbed } from "./reddit.helpers";
import * as queries from "./queries";

const snooWrap = new snoowrap({
  userAgent: "owo-bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

export const reddit = async (message, args) => {
  const { channel } = message;
  try {
    if (!args.length) {
      return channel.send("You need to provide a subreddit to fetch from!");
    }

    const subreddit = args[0].toLowerCase();
    const subredditInDb = await queries.getSubreddit(subreddit);
    if (!subredditInDb) {
      await queries.addSubreddit(subreddit);
    }

    const getTopArgs = {
      time: "all",
      count: PAGE_SIZE
    };
    if (subredditInDb && subredditInDb.last_viewed_submission) {
      getTopArgs.after = `t3_${subredditInDb.last_viewed_submission}`;
    }
    const posts = await snooWrap.getSubreddit(subreddit).getTop(getTopArgs);
    if (!posts.length) {
      throw new Error("No posts left in the subreddit");
    }

    const promises = [];
    let post;
    let foundPost = false;
    for (post of posts) {
      const postInDb = await queries.getSubmission(post.id, subreddit);
      if (!postInDb) {
        promises.push(queries.addSubmission(post.id, subreddit));
        const embed = createImageEmbed(post);
        if (embed) {
          promises.push(channel.send(embed));
          foundPost = true;
          break;
        }
      }
    }

    promises.push(queries.setSubredditLastViewedSubmission(subreddit, post.id));
    if (!foundPost) {
      promises.push(
        channel.send("I searched a page of posts and didn't find any images :/")
      );
    }

    await Promise.all(promises);
  } catch (err) {
    logger.error(err.toString());
    await channel.send("❌Failed to retrieve post from the subreddit.");
  }
};
