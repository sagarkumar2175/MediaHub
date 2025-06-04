// src/pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoList from "../components/VideoList";
import { fetchFromAPI } from "../api";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await fetchFromAPI(`search?q=${encodeURIComponent(searchTerm)}`);
        setVideos(data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [searchTerm]);

  return <VideoList videos={videos} title={`Search Results for "${searchTerm}"`} />;
};

export default SearchResults;
