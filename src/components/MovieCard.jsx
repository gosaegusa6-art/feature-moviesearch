import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
        />
      ) : (
        <div className="no-image">
          No Image
        </div>
      )}

      <div className="movie-card-info">
        <h3>
          {movie.title}
        </h3>

        <div className="movie-meta">
          <span>{year}</span>

          <span>
            ★ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;