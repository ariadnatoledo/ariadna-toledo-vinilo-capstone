import "./HomePage.scss";
import VinylOfTheWeek from "../../components/VinylOfTheWeek/VinylOfTheWeek";
import HeroSection from "../../components/HeroSection/HeroSection";

function HomePage({ user }) {
  return (
    <div>
      {user.username && (
        <h3 className="welcome-message">
          Welcome {user.username}
          {user.avatar && (
            <img
              className="avatar avatar--homepage"
              src={user.avatar}
              alt={user.username}
            />
          )}
        </h3>
      )}
      <section className="hero">
        <HeroSection />
      </section>
      <section className="vinyl-of-the-week">
        <VinylOfTheWeek />
      </section>
    </div>
  );
}


export default HomePage;

