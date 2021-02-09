import React, { useRef, useState } from "react";
import { auth } from "../firebase";

import "../css/Signup.css";

function Signup({ email, handleEmail }) {
  const passwordRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, passwordRef.current.value)
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, passwordRef.current.value)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <form>
        <h1>Sign In</h1>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
        />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signup__gray">New to Netflix? </span>
          <span className="signup__link" onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default Signup;
