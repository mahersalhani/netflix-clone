import videoTestData from "../data/videos.json";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

  const res = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`);
  return await res.json();
};

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT;

    const data = isDev ? videoTestData : await fetchVideos(url);

    return data?.items?.map((item) => {
      const id = item?.id?.videoId || item?.id;
      const snippet = item.snippet;

      if (data?.error) {
        return [];
      }

      return {
        title: snippet?.title,
        imgUrl: snippet?.thumbnails?.high?.url,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.log("something went wrong", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

  //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc

  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};
