import React from 'react'
import heroImage from "../../assets/images/vinyl-hero-03.jpg";
import "./HeroSection.scss";

function HeroSection() {
    return (
      <div className="hero-section">
        <div className="hero-section__opacity">
          <img
            src={heroImage}
            alt="Hero background"
            className="hero-section__image"
          />
          <div className="hero-section__content">
            <h1 className="hero-section__title">Discover Underground Vinyl Gems</h1>
            <p className="hero-section__subtitle">
              Explore fresh releases and hidden treasures in the vinyl world.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default HeroSection;
  