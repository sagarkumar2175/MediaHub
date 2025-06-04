// src/components/Sidebar.jsx
import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

// YouTube category IDs: see https://developers.google.com/youtube/v3/docs/videoCategories
const categories = [
  { title: "All", id: "0" },
  { title: "Music", id: "10" },
  { title: "Gaming", id: "20" },
  { title: "News", id: "25" },
  { title: "Sports", id: "17" },
  { title: "Education", id: "27" },
  // Add more if you like
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100px", marginTop: "60px" }}>
      <List>
        {categories.map((cat) => (
          <ListItemButton
            key={cat.id}
            onClick={() => {
              if (cat.id === "0") navigate("/");
              else navigate(`/?category=${cat.id}`);
            }}
          >
            <ListItemText primary={cat.title} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
