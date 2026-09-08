import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link
        to="/"
        className="logo"
      >
        MY MOVIE LIBRARY
      </Link>

      <nav>
        <Link to="/">
          Search
        </Link>

        <Link to="/library">
          My Library
        </Link>
      </nav>
    </header>
  );
}

export default Header;