import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/img.png";
import fasionImage from "../assets/fasion-3.jpg";
import "../components/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h2>Your Personal Fashion Assistant</h2>
          <p>
            Discover trendsetting styles and create your own fashion statement
            with our curated collections. Explore the latest trends from
            innovative designers.
          </p>
          <p className="hero-description">
            StyleMate helps users who struggle with outfit choices by providing
            personalized fashion recommendations.
          </p>
          <div className="hero-buttons">
            <Link to="/recommendations" className="btn btn-primary">
              Get Recommendations
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
        <div className="fashion-image">
          {/* <img src={Image} alt="Fashion styles" /> */}
          <img src={fasionImage} alt="Fashion styles" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
