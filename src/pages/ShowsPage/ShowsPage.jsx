import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowsPage.scss";

const ShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get("http://localhost:3306/shows");
        console.log("Fetched shows:", response.data);
        setShows(response.data);
      } catch (err) {
        console.error("Error fetching shows:", err);
        setError("Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="shows-page">
      <h2>Upcoming Vinyl Shows</h2>
      <div className="shows-list">
        {shows.map((show) => (
          <div key={show.showId} className="show-card">
            <img src={`http://localhost:3306${show.imageFlyerUrl}`} alt={show.name} />
            <h3>{show.name}</h3>
            <p>Date: {new Date(show.date).toLocaleDateString()}</p>
            <p>Location: {show.location}</p>
            <p>{show.description}</p>
            <p>Organizer: {show.organizer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowsPage;

