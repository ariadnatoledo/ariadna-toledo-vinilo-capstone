import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VinylOfTheWeek.scss";

const VinylOfTheWeek = () => {
  const [vinyls, setVinyls] = useState([]);
  const [currentVinylIndex, setCurrentVinylIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const response = await axios.get("http://localhost:3306/homepage-vinyls");
        setVinyls(response.data);
      } catch (err) {
        setError("Failed to fetch vinyls");
      } finally {
        setLoading(false);
      }
    };

    fetchVinyls();
  }, []);

  const handleSlide = (direction) => {
    setCurrentVinylIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0 ? vinyls.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % vinyls.length;
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="vinyl-hero">
      <button
        className="vinyl-hero__arrow left"
        onClick={() => handleSlide("left")}
      >
        &#8592;
      </button>
      <div
        className="vinyl-hero__wrapper"
        style={{ transform: `translateX(-${currentVinylIndex * 100}%)` }}
      >
        {vinyls.map((vinyl, index) => (
          <div
            key={vinyl.vinylId || index}
            className={`vinyl-hero__card ${
              currentVinylIndex === index ? "active" : ""
            }`}
          >
            <img
              className="vinyl-hero__image"
              src={`http://localhost:3306${vinyl.coverImage}`}
              alt={`${vinyl.title} cover`}
            />
            <div className="vinyl-hero__info">
              <h2>{vinyl.title}</h2>
              <p>{vinyl.artist}</p>
              <p>Label: {vinyl.label}</p>
              <small>Rating: {vinyl.averageRating}</small>
            </div>
          </div>
        ))}
      </div>
      <button
        className="vinyl-hero__arrow right"
        onClick={() => handleSlide("right")}
      >
        &#8594;
      </button>
    </div>
  );
};

export default VinylOfTheWeek;

