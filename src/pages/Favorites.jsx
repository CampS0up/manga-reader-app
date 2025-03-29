import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((manga) => (
          <Link
            key={`${manga.source}-${manga.id}`}
            to={`/manga/${manga.source}/${manga.id}`}
            className="text-center"
          >
            <img
              src={
                manga.source === "mangadex"
                  ? `https://uploads.mangadex.org/covers/${manga.id}/${manga.cover}.256.jpg`
                  : manga.cover
              }
              alt={manga.title}
              className="w-full h-auto rounded shadow"
            />
            <div className="mt-1">{manga.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
