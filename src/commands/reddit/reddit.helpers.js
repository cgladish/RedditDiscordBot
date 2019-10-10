import Discord from "discord.js";
import { createEmbed } from "../../util/createEmbed";

const VALID_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "gifv", "webm"];
export const PAGE_SIZE = 25;

const hasImageExtension = url => {
  return VALID_IMAGE_EXTENSIONS.some(ext =>
    url.toLowerCase().endsWith(`.${ext}`)
  );
};

export const getImageUrlFromPost = post => {
  if (hasImageExtension(post.url)) {
    return post.url;
  }
  if (
    post.url.includes("gfycat.com") &&
    post.media &&
    post.media.oembed &&
    post.media.oembed.thumbnail_url
  ) {
    return post.media.oembed.thumbnail_url;
  }

  return null;
};

export const createImageEmbed = post => {
  const imageUrl = getImageUrlFromPost(post);
  return (
    imageUrl &&
    createEmbed()
      .setAuthor(
        `/u/${post.author.name}`,
        "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png"
      )
      .setTitle(`Here's a top post from ${post.subreddit.display_name}`)
      .setURL(`http://reddit.com${post.permalink}`)
      .setImage(getImageUrlFromPost(post))
  );
};
