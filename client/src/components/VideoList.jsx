// src/components/VideoList.jsx
import React from "react";
import VideoCard from "./VideoCard";
import { Box, Typography } from "@mui/material";

const VideoList = ({ videos, title }) => {
  if (!videos?.length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flex: 1, padding: 2, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {title && (
        <Typography variant="h5" sx={{ width: "100%", mb: 2, textAlign: "center" }}>
          {title}
        </Typography>
      )}
      {videos.map((video) => (
        <VideoCard key={video.id.videoId || video.id} video={video} />
      ))}
    </Box>
  );
};

export default VideoList;
