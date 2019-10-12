import axios from "axios";
import qs from "query-string";

const buildRequestUrl = (path, queryParams) => {
  const params = qs.stringify({
    ...queryParams,
    key: process.env.YOUTUBE_API_KEY
  });
  return `https://www.googleapis.com/youtube/v3/${path}?${params}`;
};

export const getVideo = async videoId => {
  const response = await axios.get(
    buildRequestUrl("videos", {
      part: "snippet",
      id: videoId
    })
  );
  return response.data.items[0] || null;
};

export const getSearchResults = async searchArgs => {
  const response = await axios.get(
    buildRequestUrl("search", {
      part: "snippet",
      type: "video",
      q: searchArgs.join("+")
    })
  );
  return response.data.items;
};
