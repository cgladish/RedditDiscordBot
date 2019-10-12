import { createEmbed } from "../../util/createEmbed";

export const getUrlFromVideo = video => {
  return `https://www.youtube.com/watch?v=${video.id.videoId || video.id}`;
};

export const createNowPlayingEmbed = video => {
  return createEmbed()
    .setTitle(`▶️ Now Playing: ${video.snippet.title}`)
    .setURL(getUrlFromVideo(video));
};

export const createNothingIsPlayingEmbed = () => {
  return createEmbed().setTitle("❌Nothing is playing.");
};

export const createQueuedEmbed = video => {
  return createEmbed()
    .setTitle(`Coming up: ${video.snippet.title}`)
    .setURL(getUrlFromVideo(video));
};

export const createListEmbed = videos => {
  const embed = createEmbed().setTitle("Coming up in the queue:");
  let description = "";
  if (videos.length) {
    videos.forEach((video, i) => {
      description += `${i + 1}. ${video.snippet.title}\n`;
    });
  } else {
    description = "❌Nothing in the queue.";
  }
  return createEmbed()
    .setTitle("Coming up!")
    .setDescription(description);
};

export const createClearedEmbed = () => {
  return createEmbed().setTitle("Cleared the queue.");
};
