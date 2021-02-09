import React, { useState } from "react";
import SignUp from "./Signup";

import "../css/Login.css";

function Login() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmail = (email) => {
    setEmail(email);
  };

  return (
    <div className="login">
      <div className="login__background">
        <img
          className="login__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="background"
        />
        <button className="login__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>

        <div className="login__gradient"></div>
      </div>
      <div className="login__body">
        {signIn ? (
          <SignUp email={email} handleEmail={handleEmail} />
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="login__input">
              <form>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                />
                <button
                  className="login__getStarted"
                  onClick={() => setSignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
