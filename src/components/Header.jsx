import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../components/Header.css";
function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="StyleMate Logo" /> Style Mate
          </Link>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/style-guide" className="nav-link">
            Style Guide
          </Link>
          <Link to="/quiz" className="nav-link">
            Quiz
          </Link>
          <Link to="/recommendations" className="nav-link">
            Recommendations
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          {/* <Link to="/login" className="nav-link">
            Login
          </Link> */}

          <Link to="/signup" className="nav-link">
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
