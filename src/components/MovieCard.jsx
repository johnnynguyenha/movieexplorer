export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450";

  return (
    <div className="movie-card">
      <img className="movie-poster" src={posterUrl} alt={movie.title} />
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-release-date">
        Release Date: {movie.release_date || "N/A"}
      </p>
      <p className="movie-rating">Rating: {movie.vote_average}</p>
    </div>
  );
}
