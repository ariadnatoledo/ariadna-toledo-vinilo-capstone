import { useState } from "react";
import "./LoginPage.scss";

function LoginPage({ handleLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login-page">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-container">
          <button className="form__btn" type="submit">
            Sign In
          </button>
          <button className="form__btn-register" type="button">
            <a href="/register">Sign Up</a>
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
