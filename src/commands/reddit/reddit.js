import snoowrap from "snoowrap";
import logger from "winston";

import auth from "../../../auth.json";
import bot from "../../bot";
import { PAGE_SIZE, createEmbed } from "./reddit.helpers";

export const reddit = (() => {
  const snooWrap = new snoowrap(auth["reddit"]);
  const indicesBySubreddit = {};
  const postsBySubreddit = {};

  return async (channel, args) => {
    try {
      if (!args.length) {
        return channel.send("You need to provide a subreddit to fetch from!");
      }

      const subreddit = args[0];
      for (let i = 0; i < PAGE_SIZE; ++i) {
        const index = indicesBySubreddit[subreddit] || 0;
        indicesBySubreddit[subreddit] = (index + 1) % PAGE_SIZE;

        let posts = postsBySubreddit[subreddit];
        if (!index) {
          if (posts) {
            posts = await posts.fetchMore(PAGE_SIZE, false);
          } else {
            posts = await snooWrap
              .getSubreddit(subreddit)
              .getTop({ time: "all", count: PAGE_SIZE });
          }
          postsBySubreddit[subreddit] = posts;
          if (!posts.length) {
            throw new Error("No posts left in the subreddit");
          }
        }

        const embed = createEmbed(posts[index]);
        if (embed) {
          await channel.send(embed);
          return;
        }
      }

      channel.send("I searched a page of posts and didn't find any images :/");
    } catch (err) {
      logger.error(err.toString());
      channel.send("Failed to retrieve post from the subreddit.");
    }
  };
})();
