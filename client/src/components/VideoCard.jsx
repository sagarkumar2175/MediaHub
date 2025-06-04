// src/components/VideoCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const VideoCard = ({ video }) => {
  // `video.id.videoId` (from /api/search) or `video.id` (from /api/category),
  // so we normalize:
  const videoId = video.id.videoId || video.id;

  const snippet = video.snippet || {};
  return (
    <Card sx={{ width: 300, margin: 1 }}>
      <Link to={`/watch/${videoId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia
          component="img"
          image={snippet.thumbnails?.high?.url}
          alt={snippet.title}
          sx={{ height: 180 }}
        />
      </Link>
      <CardContent>
        <Link to={`/watch/${videoId}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {snippet.title.slice(0, 50) + (snippet.title.length > 50 ? "…" : "")}
          </Typography>
        </Link>
        <Link to={`/channel/${snippet.channelId}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="subtitle2" color="textSecondary">
            {snippet.channelTitle}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
