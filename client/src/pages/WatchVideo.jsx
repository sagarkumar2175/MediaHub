// src/pages/WatchVideo.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player"; // install: npm install react-player
import VideoList from "../components/VideoList";
import { fetchFromAPI } from "../api";

const WatchVideo = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        // 1. Fetch video details (snippet, statistics)
        const detailData = await fetchFromAPI(`video?id=${id}`);
        setVideoDetail(detailData.items[0]);

        // 2. Fetch related videos
        const relatedData = await fetchFromAPI(`related?id=${id}`);
        setRelatedVideos(relatedData.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideoData();
  }, [id]);

  if (!videoDetail) return <Typography>Loading video...</Typography>;

  const { snippet, statistics } = videoDetail;

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <Box sx={{ flex: 2, padding: 2 }}>
        <Box sx={{ position: "sticky", top: 60 }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width="100%"
          />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            {snippet.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {snippet.channelTitle} • {Number(statistics.viewCount).toLocaleString()} views
          </Typography>
          <Typography sx={{ mt: 2 }}>{snippet.description}</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Related Videos
        </Typography>
        <VideoList videos={relatedVideos} />
      </Box>
    </Box>
  );
};

export default WatchVideo;
