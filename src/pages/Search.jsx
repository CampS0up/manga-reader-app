import { useState } from "react";
import { searchMangaDex, searchKitsu } from "../api/mangaApi";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const [dexResults, kitsuResults] = await Promise.all([
      searchMangaDex(query),
      searchKitsu(query),
    ]);
    setResults([...dexResults, ...kitsuResults]);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search manga..."
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((manga) => (
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
