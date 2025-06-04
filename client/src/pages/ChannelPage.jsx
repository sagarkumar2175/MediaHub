// src/pages/ChannelPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import VideoList from "../components/VideoList";
import { fetchFromAPI } from "../api";

const ChannelPage = () => {
  const { id } = useParams(); // id = channelId
  const [channelDetail, setChannelDetail] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // 1. Fetch channel details (For banner, subscribers, etc.)
        const detailResponse = await fetchFromAPI(`video?id=${id}`); 
        // NOTE: YouTube Data v3 API’s `/channels` endpoint is different; 
        // if your backend exposes /api/channelDetail?cid=..., use that. 
        // For simplicity here, we skip channel banner & subscriber count. 
        setChannelDetail(detailResponse.items[0]?.snippet);

        // 2. Fetch channel’s videos
        const videosResponse = await fetchFromAPI(`channel?channelId=${id}`);
        setChannelVideos(videosResponse.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChannelData();
  }, [id]);

  if (!channelDetail) return <Typography>Loading channel...</Typography>;

  return (
    <Box>
      {/* Channel Banner/Icon */}
      <Box
        sx={{
          height: 200,
          backgroundColor: "#f1f1f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: 150, height: 150, borderRadius: "50%" }}>
          <CardMedia
            component="img"
            image={channelDetail.thumbnails?.high?.url}
            alt={channelDetail.title}
            sx={{ borderRadius: "50%" }}
          />
        </Card>
      </Box>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        {channelDetail.title}
      </Typography>

      {/* Channel’s Videos */}
      <VideoList videos={channelVideos} />
    </Box>
  );
};

export default ChannelPage;
