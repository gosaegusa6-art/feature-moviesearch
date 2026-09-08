import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();

  const TOKEN =
    import.meta.env.VITE_TMDB_TOKEN;

  const [movie, setMovie] =
    useState(null);

  const [status, setStatus] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [review, setReview] =
    useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=ja-JP`,
        {
          headers: {
            Authorization:
              `Bearer ${TOKEN}`,
            accept:
              "application/json",
          },
        }
      );

      const data =
        await response.json();

      setMovie(data);
    };

    fetchMovie();

    const saved =
      JSON.parse(
        localStorage.getItem(
          "movieLibrary"
        )
      ) || [];

    const savedMovie =
      saved.find(
        (item) =>
          item.id === Number(id)
      );

    if (savedMovie) {
      setStatus(savedMovie.status);
      setRating(savedMovie.rating);
      setReview(savedMovie.review);
    }
  }, [id, TOKEN]);

  const saveMovie = (
    newStatus
  ) => {
    const library =
      JSON.parse(
        localStorage.getItem(
          "movieLibrary"
        )
      ) || [];

    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path:
        movie.poster_path,
      release_date:
        movie.release_date,

      vote_average:
        movie.vote_average,

      status: newStatus,
      rating,
      review,

      savedAt:
        new Date().toISOString(),
    };

    const filtered =
      library.filter(
        (item) =>
          item.id !== movie.id
      );

    const newLibrary = [
      movieData,
      ...filtered,
    ];

    localStorage.setItem(
      "movieLibrary",
      JSON.stringify(
        newLibrary
      )
    );

    setStatus(newStatus);
  };

  const saveReview = () => {
    if (!status) {
      alert(
        "WatchedまたはWatchlistに登録してください"
      );

      return;
    }

    saveMovie(status);

    alert(
      "レビューを保存しました"
    );
  };

  if (!movie) {
    return (
      <p className="status">
        Loading...
      </p>
    );
  }

  const poster =
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  return (
    <main className="container">
      <section className="detail">
        <div>
          {poster && (
            <img
              className="detail-poster"
              src={poster}
              alt={movie.title}
            />
          )}
        </div>

        <div className="detail-info">
          <p className="small-title">
            MOVIE
          </p>

          <h1>
            {movie.title}
          </h1>

          <p className="original-title">
            {movie.original_title}
          </p>

          <p className="detail-meta">
            {movie.release_date}
            {" ・ "}
            ★{" "}
            {movie.vote_average?.toFixed(
              1
            )}
          </p>

          <div className="genres">
            {movie.genres?.map(
              (genre) => (
                <span
                  key={genre.id}
                >
                  {genre.name}
                </span>
              )
            )}
          </div>

          <h3>Story</h3>

          <p className="overview">
            {movie.overview ||
              "あらすじ情報がありません。"}
          </p>

          <div className="action-buttons">
            <button
              className={
                status ===
                "watchlist"
                  ? "active-button"
                  : ""
              }
              onClick={() =>
                saveMovie(
                  "watchlist"
                )
              }
            >
              ♡ Watchlist
            </button>

            <button
              className={
                status ===
                "watched"
                  ? "active-button"
                  : ""
              }
              onClick={() =>
                saveMovie(
                  "watched"
                )
              }
            >
              ✓ Watched
            </button>
          </div>

          <div className="review-area">
            <h3>
              Your Rating
            </h3>

            <div className="stars">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    onClick={() =>
                      setRating(
                        star
                      )
                    }
                  >
                    {star <= rating
                      ? "★"
                      : "☆"}
                  </button>
                )
              )}
            </div>

            <h3>
              Your Review
            </h3>

            <textarea
              placeholder="映画の感想を書いてください..."
              value={review}
              onChange={(event) =>
                setReview(
                  event.target.value
                )
              }
            />

            <button
              className="save-button"
              onClick={
                saveReview
              }
            >
              Save Review
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetail;