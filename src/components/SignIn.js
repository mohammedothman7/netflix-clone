import React, { useRef } from "react";
import { auth } from "../firebase";

import "../css/SignIn.css";
import { useHistory } from "react-router-dom";

function SignIn({ email, handleEmail }) {
  const passwordRef = useRef(null);
  let history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, passwordRef.current.value)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signin">
      <div className="getStarted__gradient"></div>
      <div className="signin__container">
        <form>
          <h1>Sign In</h1>
          <input
            placeholder="Email"
            type="email"
            value={email}
            // onChange={(e) => handleEmail(e.target.value)}
          />
          <input placeholder="Password" type="password" ref={passwordRef} />
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
          <h4>
            <span
              className="signin__gray"
              onClick={() => history.push("/signin")}
            >
              New to Netflix?{" "}
            </span>
            <span className="signin__link">Sign up now.</span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
