import ytdl from "ytdl-core";

import { getUrlFromVideo } from "./helpers";

class Queue {
  constructor() {
    this.videoQueue = [];
    this.connection = null;
    this.connectionDispatcher = null;
  }

  getCurrentVideo() {
    const currentVideo = this.videoQueue[0];
    return currentVideo ? currentVideo.video : null;
  }

  getVideos() {
    return this.videoQueue.map(videoEntry => videoEntry.video);
  }

  async add(voiceChannel, video) {
    this.videoQueue.push({ voiceChannel, video });
    if (this.videoQueue.length === 1) {
      await this.play();
    }
  }

  skip() {
    if (this.connectionDispatcher) {
      this.connectionDispatcher.end();
    }
  }

  async next() {
    this.videoQueue.shift();
    if (!this.videoQueue.length && this.connection) {
      await this.connection.disconnect();
    } else if (this.videoQueue.length) {
      await this.play();
    }
  }

  async play() {
    const currentVideo = this.videoQueue[0];
    const { voiceChannel, video } = currentVideo;

    const stream = ytdl(getUrlFromVideo(video), { filter: "audioonly" });
    this.connection = await voiceChannel.join();
    this.connectionDispatcher = this.connection.playStream(stream);
    this.connectionDispatcher.on("end", () => this.next());
  }
}

export const queue = new Queue();
