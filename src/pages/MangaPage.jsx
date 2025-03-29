import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MangaPage() {
  const { source, id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (source === "mangadex") {
      fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`)
        .then(res => res.json())
        .then(data => {
          setManga(data.data);
        });

      fetch(`https://api.mangadex.org/chapter?manga=${id}&translatedLanguage[]=en&order[chapter]=asc&limit=50`)
        .then(res => res.json())
        .then(data => {
          setChapters(data.data);
        });
    }
  }, [id, source]);

  if (!manga) return <div>Loading manga details...</div>;

  const title = manga.attributes.title.en || "No Title";
  const cover = manga.relationships.find(rel => rel.type === "cover_art")?.attributes?.fileName;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <img
          src={`https://uploads.mangadex.org/covers/${id}/${cover}.256.jpg`}
          alt={title}
          className="w-48 rounded shadow"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="mb-4">{manga.attributes.description.en?.substring(0, 300)}...</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Chapters</h2>
      <ul className="space-y-2">
        {chapters.map(ch => (
          <li key={ch.id}>
            <Link
              to={`/reader/${source}/${id}/${ch.id}`}
              className="text-blue-600 hover:underline"
            >
              Chapter {ch.attributes.chapter || "?"}: {ch.attributes.title || "No Title"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
