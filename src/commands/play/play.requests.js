import axios from "axios";
import qs from "query-string";

const buildRequestUrl = (path, queryParams) => {
  const params = qs.stringify({
    ...queryParams,
    key: process.env.YOUTUBE_API_KEY
  });
  return `https://www.googleapis.com/youtube/v3/${path}?${params}`;
};

export const getSearchResults = async search => {
  const response = await axios.get(
    buildRequestUrl("search", { part: "snippet", q: search })
  );
  return response.data.items;
};
