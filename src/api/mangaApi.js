export async function searchMangaDex(query) {
  const url = `https://api.mangadex.org/manga?title=${encodeURIComponent(query)}&limit=10&includes[]=cover_art`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data.map((manga) => ({
    id: manga.id,
    source: "mangadex",
    title: manga.attributes.title.en || "No Title",
    cover: manga.relationships.find(rel => rel.type === "cover_art")?.attributes?.fileName,
  }));
}

export async function searchKitsu(query) {
  const url = `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(query)}&page[limit]=10`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data.map((manga) => ({
    id: manga.id,
    source: "kitsu",
    title: manga.attributes.titles.en_jp || "No Title",
    cover: manga.attributes.posterImage?.small,
  }));
}
