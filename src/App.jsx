import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Library from "./pages/Library";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/movie/:id"
          element={<MovieDetail />}
        />

        <Route
          path="/library"
          element={<Library />}
        />
      </Routes>
    </>
  );
}

export default App;