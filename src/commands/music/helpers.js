import { createEmbed } from "../../util/createEmbed";

export const getUrlFromVideo = video => {
  return `https://www.youtube.com/watch?v=${video.id.videoId || video.id}`;
};

export const createNowPlayingEmbed = video => {
  return createEmbed()
    .setTitle(`▶️ Now Playing: ${video.snippet.title}`)
    .setURL(getUrlFromVideo(video));
};

export const createQueuedEmbed = video => {
  return createEmbed()
    .setTitle(`Coming up: ${video.snippet.title}`)
    .setURL(getUrlFromVideo(video));
};
