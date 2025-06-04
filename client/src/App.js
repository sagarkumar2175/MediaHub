// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import WatchVideo from "./pages/WatchVideo";
import ChannelPage from "./pages/ChannelPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex", marginTop: "60px" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
          <Route path="/watch/:id" element={<WatchVideo />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
