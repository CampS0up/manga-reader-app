import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MangaPage from "./pages/MangaPage";
import Reader from "./pages/Reader";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/manga/:source/:id" element={<MangaPage />} />
          <Route path="/reader/:source/:id/:chapterId" element={<Reader />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
