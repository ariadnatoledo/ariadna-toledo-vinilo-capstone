import "./HomePage.scss";
import VinylOfTheWeek from "../../components/VinylOfTheWeek/VinylOfTheWeek";

function HomePage({ user }) {
  return (
    <div>
      <h2>Home</h2>
      {user.userName && (
        <>
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
          <section className="vinyl-of-the-week">
            <h3>Vinyl of the Week</h3>
            <VinylOfTheWeek />
          </section>
        </>
      )}
    </div>
  );
}

export default HomePage;



// import "./HomePage.scss";
// import VinylOfTheWeek from "../../components/VinylOfTheWeek/VinylOfTheWeek";

// function HomePage({ user }) {
//   return (
//     <div>
//       <h2>Home</h2>
//       {user.userName && (
//         <h3 className="welcome-message">
//           Welcome {user.userName}
//           {user.avatar && (
//             <img
//               className="avatar avatar--homepage"
//               src={user.avatar}
//               alt={user.userName}
//             />
//           )}
//         </h3>
//       )}
//       <section className="vinyl-of-the-week">
//         <h3>Vinyl of the Week</h3>
//         <VinylOfTheWeek />
//       </section>
//     </div>
//   );
// }

// export default HomePage;
