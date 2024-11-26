import React, { useEffect, useState } from "react";
import axios from "axios";

const VinylOfTheWeek = () => {
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const response = await axios.get("http://localhost:3306/vinyls/random");
        console.log("Fetched vinyls:", response.data); 

        setVinyls(response.data);
      } catch (err) {
        console.error("Error fetching vinyls:", err);
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
    <div className="vinyl-list">
      {vinyls.map((vinyl) => (
        <div key={vinyl.vinylId} className="vinyl-card">
          <img src={`http://localhost:3306${vinyl.coverImage}`} alt={`${vinyl.title} cover`} />
          <h2>{vinyl.title}</h2>
          <p>{vinyl.artist}</p>
          <audio controls>
            <source src={`http://localhost:3306${vinyl.previewTrack}`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default VinylOfTheWeek;