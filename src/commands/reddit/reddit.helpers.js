import Discord from "discord.js";
import logger from "winston";
import { createEmbed } from "../../util/createEmbed";

const VALID_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webm"];
export const PAGE_SIZE = 25;

const hasImageExtension = (url) => {
  return VALID_IMAGE_EXTENSIONS.some((ext) =>
    url.toLowerCase().endsWith(`.${ext}`)
  );
};

export const getImageUrlFromPost = (post) => {
  if (hasImageExtension(post.url)) {
    return post.url;
  }
  if (post.media && post.media.oembed && post.media.oembed.thumbnail_url) {
    return post.media.oembed.thumbnail_url;
  }

  return null;
};

const createGenericEmbed = (post) => {
  return createEmbed()
    .setAuthor(
      `/u/${post.author.name}`,
      "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png"
    )
    .setTitle(post.title)
    .setURL(`http://reddit.com${post.permalink}`);
};

export const createImageEmbed = (post) => {
  const imageUrl = getImageUrlFromPost(post);
  return (
    imageUrl && createGenericEmbed(post).setImage(getImageUrlFromPost(post))
  );
};

export const createTextEmbed = (post) => {
  const postText =
    post.selftext.length > 2048
      ? post.selftext.slice(0, 2045) + "..."
      : post.selftext.slice(0, 2048);
  return (
    post.selftext &&
    createGenericEmbed(post).setDescription(postText).setColor("#4CBB17")
  );
};

export const createEmptyEmbed = (post) => {
  return createGenericEmbed(post).setColor("#FBD428");
};
