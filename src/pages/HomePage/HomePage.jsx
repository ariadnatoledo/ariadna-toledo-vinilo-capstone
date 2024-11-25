import "./HomePage.scss";

function HomePage({ user }) {
  return (
    <div>
      <h2>Home</h2>
      {user.userName && (
        <h3 className="welcome-message">
          Welcome {user.userName}
          {user.avatar && (
            <img
              className="avatar avatar--homepage"
              src={user.avatar}
              alt={user.userName}
            />
          )}
        </h3>
      )}
    </div>
  );
}

export default HomePage;