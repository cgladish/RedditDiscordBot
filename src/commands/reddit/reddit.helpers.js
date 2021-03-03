import { createEmbed } from "../../util/createEmbed";

export const PAGE_SIZE = 25;

export const getSelfTextFromPost = (post) => {
  return post.selftext.length > 2048
    ? post.selftext.slice(0, 2045) + "..."
    : post.selftext.slice(0, 2048);
};

export const getPermalinkFromPost = (post) =>
  `https://reddit.com${post.permalink}`;

export const doLinksMatch = (link1, link2) =>
  link1.replace("http:", "https:") === link2.replace("http:", "https:");

export const createEmbedFromPost = (post) => {
  const embed = createEmbed()
    .setAuthor(
      `/u/${post.author.name}`,
      "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png"
    )
    .setTitle(post.title)
    .setURL(getPermalinkFromPost(post));
  if (post.selftext) {
    const postText = getSelfTextFromPost(post);
    embed.setDescription(postText).setColor("#4CBB17");
  }
  return embed;
};
