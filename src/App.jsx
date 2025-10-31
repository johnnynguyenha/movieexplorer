import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import "./styles.css";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjExZDNjZjA2OThjM2ZjMTJhMjczNTE5ZmNhM2UxMyIsIm5iZiI6MTc2MDA5MzQ2Mi4yNTYsInN1YiI6IjY4ZThlNTE2MGIwZDY4NTNhZmFhMWQ0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uWrqOQJISrZUR1XOhdn6SzEVEbJTrjnJLfc37hbaOk0",
  },
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(page, true);
  }, [query, sort, page]);

  async function fetchMovies(page = 1, resetTotal = false) {
    const baseUrl = query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

    try {
      const res = await fetch(baseUrl, API_OPTIONS);
      const data = await res.json();
      if (resetTotal) setTotalPages(data.total_pages);

      let sorted = data.results;
      if (sort) {
        if (sort === "release-asc")
          sorted.sort(
            (a, b) => new Date(a.release_date) - new Date(b.release_date)
          );
        if (sort === "release-desc")
          sorted.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          );
        if (sort === "rating-asc")
          sorted.sort((a, b) => a.vote_average - b.vote_average);
        if (sort === "rating-desc")
          sorted.sort((a, b) => b.vote_average - a.vote_average);
      }

      setMovies(sorted);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  }

  return (
    <div className="app-root">
      <Header />
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
      />
      <div className="movies-container">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
}
