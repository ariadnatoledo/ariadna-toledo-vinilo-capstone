import { useState } from "react";
import axios from "axios";
import "./RegisterPage.scss";

function RegisterPage({ handleRegister, error }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, username, password);
  };

  return (
    <div className="register-page">
      {/* <h1>Register</h1> */}
      <form className="form" onSubmit={handleSubmit}>
        <input className="form__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="form__input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="form__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form__btn" type="submit">Register</button>
        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
}

export default RegisterPage;
