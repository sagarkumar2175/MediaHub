// src/components/ChannelCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ChannelCard = ({ channel }) => {
  const snippet = channel.snippet || {};
  const channelId = channel.id.channelId || channel.id;
  return (
    <Card sx={{ width: 250, margin: 1 }}>
      <Link to={`/channel/${channelId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia
          component="img"
          image={snippet.thumbnails?.high?.url}
          alt={snippet.title}
          sx={{ height: 140, borderRadius: "50%" }}
        />
      </Link>
      <CardContent sx={{ textAlign: "center" }}>
        <Link to={`/channel/${channelId}`} style={{ textDecoration: "none" }}>
          <Typography variant="subtitle1">{snippet.title}</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
