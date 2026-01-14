import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Header.css";

// ✅ IMPORT LOGO PROPERLY
import logo from "../assets/logo.png"; // change path if needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Style Guide", path: "/style-guide" },
    { name: "Quiz", path: "/quiz" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Contact", path: "/contact" },
    { name: "Signup", path: "/signup", highlight: true },
  ];

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsMenuOpen(false);
    window.location.href = path;
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">

          {/* ✅ LOGO */}
          <div className="logo">
            <a
              href="/"
              className="logo-link"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("/");
              }}
            >
              <img src={logo} alt="StyleMate" className="logo-image" />
              <span className="logo-text">StyleMate</span>
            </a>
          </div>

          {/* ✅ DESKTOP NAV */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                className={`nav-link ${
                  activeLink === link.path ? "active" : ""
                } ${link.highlight ? "highlight" : ""}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ✅ MOBILE MENU BUTTON */}
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* ✅ MOBILE OVERLAY */}
      {isMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ✅ MOBILE NAV */}
      <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <img src={logo} alt="StyleMate" className="mobile-logo-icon" />
          <span className="mobile-logo-text">StyleMate</span>
        </div>

        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.path);
              }}
              className={`mobile-nav-link ${
                activeLink === link.path ? "active" : ""
              } ${link.highlight ? "highlight" : ""}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <p>© 2026 StyleMate</p>
          <span>Your Personal Fashion Assistant</span>
        </div>
      </nav>
    </>
  );
};

export default Header;
