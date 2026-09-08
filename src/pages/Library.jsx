import {
  useEffect,
  useState,
} from "react";

import MovieCard from "../components/MovieCard";

function Library() {
  const [movies, setMovies] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "movieLibrary"
        )
      ) || [];

    setMovies(saved);
  }, []);

  const filteredMovies =
    movies.filter((movie) => {
      if (filter === "all") {
        return true;
      }

      return (
        movie.status === filter
      );
    });

  const watchedCount =
    movies.filter(
      (movie) =>
        movie.status === "watched"
    ).length;

  const watchlistCount =
    movies.filter(
      (movie) =>
        movie.status ===
        "watchlist"
    ).length;

  const watched =
    movies.filter(
      (movie) =>
        movie.status === "watched"
    );

  const averageRating =
    watched.length > 0
      ? (
          watched.reduce(
            (total, movie) =>
              total +
              Number(
                movie.rating || 0
              ),
            0
          ) / watched.length
        ).toFixed(1)
      : "0.0";

  return (
    <main className="container">
      <section className="library-header">
        <p className="small-title">
          YOUR COLLECTION
        </p>

        <h1>
          My Library
        </h1>

        <div className="stats">
          <div>
            <strong>
              {watchedCount}
            </strong>

            <span>
              Watched
            </span>
          </div>

          <div>
            <strong>
              {watchlistCount}
            </strong>

            <span>
              Watchlist
            </span>
          </div>

          <div>
            <strong>
              ★ {averageRating}
            </strong>

            <span>
              Average
            </span>
          </div>
        </div>

        <div className="filters">
          <button
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter(
                "watched"
              )
            }
          >
            Watched
          </button>

          <button
            onClick={() =>
              setFilter(
                "watchlist"
              )
            }
          >
            Watchlist
          </button>
        </div>
      </section>

      {filteredMovies.length ===
      0 ? (
        <p className="status">
          まだ映画が登録されていません。
        </p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map(
            (movie) => (
              <div
                key={movie.id}
              >
                <MovieCard
                  movie={movie}
                />

                {movie.rating >
                  0 && (
                  <p className="my-rating">
                    Your Rating：
                    {"★".repeat(
                      movie.rating
                    )}
                  </p>
                )}

                {movie.review && (
                  <p className="my-review">
                    {movie.review}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}

export default Library;