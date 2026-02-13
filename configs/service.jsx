import axios from "axios";

const getVideos = async (query) => {
  const resp = await axios.get(`/api/youtube?q=${query}`);
  return resp.data.items;
};

export default {
  getVideos,
};
