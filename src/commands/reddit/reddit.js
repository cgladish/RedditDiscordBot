import snoowrap from "snoowrap";
import logger from "winston";

import pgClient from "../../pgClient";
import bot from "../../bot";
import { PAGE_SIZE, createEmbed } from "./reddit.helpers";

const snooWrap = new snoowrap({
  userAgent: "owo-bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

export const reddit = (() => {
  const postsBySubreddit = {};
  return async (channel, args) => {
    try {
      if (!args.length) {
        return channel.send("You need to provide a subreddit to fetch from!");
      }

      const subreddit = args[0].toLowerCase();
      const subredditInDb = (await pgClient.query(
        `SELECT * FROM subreddits WHERE id='${subreddit}'`
      )).rows[0];
      if (!subredditInDb) {
        await pgClient.query(
          `INSERT INTO subreddits (id) VALUES ('${subreddit}')`
        );
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
          const postInDb = (await pgClient.query(
            `SELECT * FROM submissions WHERE ID='${
              post.id
            }' AND subreddit_id='${subreddit}'`
          )).rows[0];
          if (!postInDb) {
            await Promise.all([
              pgClient.query(
                `UPDATE subreddits SET viewed_index=${viewedIndex +
                  i +
                  1} WHERE id='${subreddit}'`
              ),
              pgClient.query(
                `INSERT INTO submissions VALUES ('${post.id}', '${subreddit}')`
              )
            ]);
            const embed = createEmbed(post);
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
})();
