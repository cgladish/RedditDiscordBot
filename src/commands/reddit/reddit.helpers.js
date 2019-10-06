export const getImageUrlFromPost = post => {
  if (post.is_self) {
    return null;
  }
  if (post.media && post.media.oembed && post.media.oembed.thumbnail_url) {
    return post.media.oembed.thumbnail_url;
  }
  if (
    post.preview &&
    post.preview.images &&
    post.preview.images.length &&
    post.preview.images[0].source &&
    post.preview.images[0].source.url
  ) {
    return post.preview.images[0].source.url;
  }
  if (post.url) {
    return post.url;
  }
  return null;
};
