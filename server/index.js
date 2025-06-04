// server/index.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path");
// Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}


// Allow requests from React dev server
app.use(cors());

// Base options for RapidAPI calls
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

// 1. Search Videos Endpoint
//    Expects query param ?q=searchTerm
app.get("/api/search", async (req, res) => {
  const queryTerm = req.query.q;
  if (!queryTerm) {
    return res.status(400).json({ error: "q (query) is required" });
  }

  try {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/search`,
      params: { q: queryTerm, part: "snippet", maxResults: "20", type: "video" },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    };
    const response = await axios.request(options);
    res.json(response.data); // send raw YouTube API response
  } catch (error) {
    console.error("Error fetching from RapidAPI:", error.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// 2. Get Video Details Endpoint
//    Expects ?id=VIDEO_ID
app.get("/api/video", async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: "id (videoId) is required" });
  }
  try {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/videos`,
      params: { id: videoId, part: "snippet,statistics" },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching video details:", error.message);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
});

// 3. Get Related Videos Endpoint
//    Expects ?id=VIDEO_ID
app.get("/api/related", async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: "id (videoId) is required" });
  }
  try {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/search`,
      params: { relatedToVideoId: videoId, part: "snippet", maxResults: "15", type: "video" },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching related videos:", error.message);
    res.status(500).json({ error: "Failed to fetch related videos" });
  }
});

// 4. Get Channel Videos Endpoint
//    Expects ?channelId=CHANNEL_ID
app.get("/api/channel", async (req, res) => {
  const channelId = req.query.channelId;
  if (!channelId) {
    return res.status(400).json({ error: "channelId is required" });
  }
  try {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/search`,
      params: {
        channelId,
        part: "snippet,id",
        order: "date",
        maxResults: "20",
        type: "video",
      },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching channel videos:", error.message);
    res.status(500).json({ error: "Failed to fetch channel videos" });
  }
});

// 5. Search by Category (optional)
//    YouTube Data API doesn’t let you filter EXACTLY by “category name”,
//    but you can use predefined category IDs. We can map “Music” → 10, etc.
app.get("/api/category", async (req, res) => {
  const categoryId = req.query.cat; // for example: 10 for Music
  if (!categoryId) {
    return res.status(400).json({ error: "cat (categoryId) is required" });
  }
  try {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/videos`,
      params: {
        chart: "mostPopular",
        regionCode: "US",
        videoCategoryId: categoryId,
        part: "snippet,statistics",
        maxResults: "20",
      },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching category videos:", error.message);
    res.status(500).json({ error: "Failed to fetch category videos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
