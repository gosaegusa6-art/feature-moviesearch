import { useState } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const TOKEN =
    import.meta.env.VITE_TMDB_TOKEN;

  const searchMovies = async (event) => {
    event.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url =
        "https://api.themoviedb.org/3/search/movie" +
        `?query=${encodeURIComponent(keyword)}` +
        "&language=ja-JP" +
        "&include_adult=false";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "映画情報の取得に失敗しました"
        );
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error(error);

      setError(
        "映画検索中にエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="hero">
        <p className="small-title">
          DISCOVER YOUR NEXT MOVIE
        </p>

        <h1>
          What will you
          <br />
          watch tonight?
        </h1>

        <p>
          好きな洋画を検索して、
          自分だけのMovie Libraryを作ろう。
        </p>

        <form
          className="search-form"
          onSubmit={searchMovies}
        >
          <input
            type="text"
            placeholder="Titanic, Inception..."
            value={keyword}
            onChange={(event) =>
              setKeyword(event.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>
      </section>

      {loading && (
        <p className="status">
          Searching...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {movies.length > 0 && (
        <section>
          <h2>
            Search Results
          </h2>

          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;