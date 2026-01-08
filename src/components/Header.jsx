import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Header.css";

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
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
          {/* Logo */}
          <div className="logo">
            <a
              href="/"
              className="logo-link"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("/");
              }}
            >
              <div className="logo-icon">SM</div>
              <span className="logo-text">Style Mate</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                className={`nav-link ${activeLink === link.path ? "active" : ""} ${
                  link.highlight ? "highlight" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <div className="mobile-logo-icon">SM</div>
          <span className="mobile-logo-text">Style Mate</span>
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
              {activeLink === link.path && (
                <span className="active-indicator">•</span>
              )}
            </a>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <p className="footer-text">© 2026 Style Mate</p>
          <p className="footer-subtext">Your Personal Fashion Assistant</p>
        </div>
      </nav>
    </>
  );
};

export default Header;