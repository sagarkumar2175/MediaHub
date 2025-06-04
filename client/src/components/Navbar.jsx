// src/components/Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ ml: 1, flex: 1, backgroundColor: "#fff", padding: "0 8px", borderRadius: "4px" }}
          />
          <IconButton type="submit" sx={{ p: "10px", color: "#fff" }}>
            <SearchIcon />
          </IconButton>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
