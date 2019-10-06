import Discord from "discord.js";

const VALID_IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "mp4",
  "mpeg",
  "avi",
  "webm",
  "tiff",
  "tif"
];
export const PAGE_SIZE = 25;

export const getImageUrlFromPost = post => {
  let url = null;

  if (!post.is_self) {
    if (post.media && post.media.oembed && post.media.oembed.thumbnail_url) {
      url = post.media.oembed.thumbnail_url;
    } else if (
      post.preview &&
      post.preview.images &&
      post.preview.images.length &&
      post.preview.images[0].source &&
      post.preview.images[0].source.url
    ) {
      url = post.preview.images[0].source.url;
    } else if (post.url) {
      url = post.url;
    }
  }

  if (
    url &&
    VALID_IMAGE_EXTENSIONS.some(ext => url.toLowerCase().endsWith(`.${ext}`))
  ) {
    return url;
  } else {
    return null;
  }
};

export const createEmbed = post => {
  const imageUrl = getImageUrlFromPost(post);
  return new Discord.RichEmbed()
    .setColor("#FFB6C1")
    .setAuthor(
      `/u/${post.author.name}`,
      "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png"
    )
    .setTitle(`Here's a top post from ${post.subreddit.display_name}`)
    .setURL(`http://reddit.com${post.permalink}`)
    .setImage(getImageUrlFromPost(post))
    .setFooter("https://github.com/cgladish/OwOBot")
    .setTimestamp();
};
