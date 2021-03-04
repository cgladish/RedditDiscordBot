import snoowrap from "snoowrap";
import logger from "winston";

import {
  PAGE_SIZE,
  createEmbedFromPost,
  getPermalinkFromPost,
  doLinksMatch,
} from "./reddit.helpers";
import * as queries from "./queries";

const snooWrap = new snoowrap({
  userAgent: "owo-bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

export const reddit = async (message, args) => {
  const { channel } = message;
  try {
    if (!args.length) {
      return channel.send("You need to provide a subreddit to fetch from!");
    }

    let foundPost = false;
    // Try twice to fetch
    for (let i = 0; i < 2; i++) {
      const subreddit = args[0].toLowerCase();
      const subredditInDb = await queries.getSubreddit(subreddit);
      if (!subredditInDb) {
        await queries.addSubreddit(subreddit);
      }

      const getHotArgs = {
        time: "all",
        count: PAGE_SIZE,
      };
      if (subredditInDb && subredditInDb.last_viewed_submission) {
        getHotArgs.after = `t3_${subredditInDb.last_viewed_submission}`;
      }
      const posts = await snooWrap.getSubreddit(subreddit).getHot(getHotArgs);

      const promises = [];
      let post;
      for (post of posts) {
        const postInDb = await queries.getSubmission(post.id, subreddit);
        if (!postInDb && !post.stickied) {
          promises.push(queries.addSubmission(post.id, subreddit));
          const embed = createEmbedFromPost(post);
          promises.push(
            channel.send(embed).then(() => {
              if (!doLinksMatch(getPermalinkFromPost(post), post.url)) {
                channel.send(post.url);
              }
            })
          );
          foundPost = true;
          break;
        }
      }

      if (foundPost) {
        promises.push(
          queries.setSubredditLastViewedSubmission(subreddit, post.id)
        );
        break;
      } else {
        promises.push(queries.clearSubredditLastViewedSubmission(subreddit));
      }
      await Promise.all(promises);
    }

    if (!foundPost) {
      throw new Error("Couldn't find any posts!");
    }
  } catch (err) {
    logger.error(err.toString());
    let errMessage = "❌Failed to retrieve post from the subreddit.";
    if (err.message) {
      errMessage += "\n" + ["```diff", err.message, "```"].join("\n");
    }
    await channel.send(errMessage);
  }
};
