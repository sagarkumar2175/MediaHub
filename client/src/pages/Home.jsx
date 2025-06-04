// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import VideoList from "../components/VideoList";
import { fetchFromAPI } from "../api";

// Mapping from category ID to readable name
const categoryMap = {
  "0": "All",
  "10": "Music",
  "20": "Gaming",
  "25": "News",
  "17": "Sports",
  "27": "Education",
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const { category } = queryString.parse(location.search);
  const displayTitle = categoryMap[category] || "Trending";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let data;
        if (!category || category === "0") {
          data = await fetchFromAPI(`category?cat=0`);
        } else {
          data = await fetchFromAPI(`category?cat=${category}`);
        }
        setVideos(data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, [category]);

  return (
    <div style={{ padding: "1rem" }}>
      {/* Title centered at top */}
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Category: {displayTitle}
      </h2>

      {/* Main content layout */}
      <div style={{ display: "flex" }}>
        {/* Sidebar on the left */}
        <div style={{ flex: "0 0 0px" }}>
          {/* Sidebar is imported in App.jsx or Layout, so you might skip this if already included */}
        </div>

        {/* Videos on the right */}
        <div style={{ flex: 1 }}>
          {videos?.length > 0 ? (
            <VideoList videos={videos} />
          ) : (
            <p>No videos found for "{displayTitle}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
