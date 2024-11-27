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
        const response = await axios.get("http://localhost:3306/vinyls/random");
        setVinyls(response.data);
      } catch (err) {
        setError("Failed to fetch vinyls");
      } finally {
        setLoading(false);
      }
    };

    fetchVinyls();
  }, []);

  useEffect(() => {
    if (vinyls.length > 0) {
      const interval = setInterval(() => {
        setCurrentVinylIndex((prevIndex) => (prevIndex + 1) % vinyls.length);
      }, 5000); 

      return () => clearInterval(interval); 
    }
  }, [vinyls]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="vinyl-hero">
      {vinyls.map((vinyl, index) => (
        <div
          key={vinyl.vinylId}
          className={`vinyl-hero__card ${currentVinylIndex === index ? "active" : ""}`}
          onMouseEnter={(e) => e.currentTarget.querySelector("audio").play()}
          onMouseLeave={(e) => {
            const audio = e.currentTarget.querySelector("audio");
            audio.pause();
            audio.currentTime = 0; 
          }}
        >
          <img
            className="vinyl-hero__image"
            src={`http://localhost:3306${vinyl.coverImage}`}
            alt={`${vinyl.title} cover`}
          />
          <div className="vinyl-hero__info">
            <h2>{vinyl.title}</h2>
            <p>{vinyl.artist}</p>
            <audio>
              <source src={`http://localhost:3306${vinyl.previewTrack}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VinylOfTheWeek;


