import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VinylOfTheWeek.scss";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const VinylOfTheWeek = () => {
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const response = await axios.get("http://localhost:3306/homepage-vinyls");
        const shuffledVinyls = shuffleArray(response.data).slice(0, 25);
        setVinyls(shuffledVinyls);
      } catch (err) {
        setError("Failed to fetch vinyls");
      } finally {
        setLoading(false);
      }
    };

    fetchVinyls();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="vinyl-hero">
      <div className="vinyl-hero__highlights">
        <h2>New Highlights</h2>
      </div>
      <div className="vinyl-hero__wrapper">
        {vinyls.map((vinyl, index) => (
          <div key={vinyl.vinylId || index} className="vinyl-hero__card">
            <img
              className="vinyl-hero__image"
              src={`http://localhost:3306${vinyl.coverImage}`}
              alt={`${vinyl.title} cover`}
            />
            <div className="vinyl-hero__info">
              <div className="vinyl-hero__title">
                <h2>{vinyl.title}</h2>
              </div>
              <div className="vinyl-hero__artist">
                <p>{vinyl.artist}</p>
              </div>
              <div className="vinyl-hero__label">
                <p>Label: {vinyl.label}</p>
              </div>
              <div className="vinyl-hero__rating">
                <small>Rating: {vinyl.averageRating}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default VinylOfTheWeek;

