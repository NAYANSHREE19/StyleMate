import React from "react";
import { Link } from "react-router-dom";
import fasionImage from "../assets/fasion-3.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text-wrapper">
            <span className="hero-badge">Fashion Excellence</span>
            <h1 className="hero-title">
              Your Personal <span className="highlight">Fashion</span> Assistant
            </h1>
            <p className="hero-subtitle">
              Discover trendsetting styles and create your own fashion statement with our curated collections. Explore the latest trends from innovative designers.
            </p>
            <p className="hero-description">
              StyleMate helps users who struggle with outfit choices by providing personalized fashion recommendations tailored to your unique style.
            </p>
            
            {/* <div className="hero-buttons">
              <Link to="/recommendations" className="btn btn-primary">
                <span className="btn-icon">✨</span>
                Get Recommendations
              </Link>
              <Link to="/login" className="btn btn-secondary">
                <span className="btn-icon">→</span>
                Login
              </Link>
            </div> */}

            <div className="hero-stats">
              <div className="stat">
                <strong>10K+</strong>
                <span>Happy Users</span>
              </div>
              <div className="stat">
                <strong>500+</strong>
                <span>Style Combinations</span>
              </div>
              <div className="stat">
                <strong>100%</strong>
                <span>Personalized</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="image-container">
            <img src={fasionImage} alt="Fashion styles" className="fashion-image" />
            <div className="image-blur"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;