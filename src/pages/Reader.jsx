import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Reader() {
  const { id, chapterId } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch(`https://api.mangadex.org/at-home/server/${chapterId}`)
      .then(res => res.json())
      .then(data => {
        const baseUrl = data.baseUrl;
        fetch(`https://api.mangadex.org/chapter/${chapterId}`)
          .then(res => res.json())
          .then(chapterData => {
            const hash = chapterData.data.attributes.hash;
            const images = chapterData.data.attributes.data.map(filename =>
              `${baseUrl}/data/${hash}/${filename}`
            );
            setPages(images);
            localStorage.setItem(`progress-${id}`, chapterId); // save reading progress
          });
      });
  }, [id, chapterId]);

  return (
    <div className="p-4 space-y-4">
      {pages.length === 0 ? (
        <p>Loading chapter...</p>
      ) : (
        pages.map((url, index) => (
          <img key={index} src={url} alt={`Page ${index + 1}`} className="w-full max-w-2xl mx-auto" />
        ))
      )}
    </div>
  );
}
