import React, { useRef } from "react";
import { auth } from "../firebase";

import "../css/SignIn.css";
import { useHistory, useLocation } from "react-router-dom";

function SignIn() {
  const location = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef(null);
  let history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(() => history.push("/"))
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
            ref={emailRef}
            required
            defaultValue={location?.state?.email}
          />
          <input
            placeholder="Password"
            type="password"
            ref={passwordRef}
            required
          />
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
          <h4>
            <span className="signin__gray">New to Netflix? </span>
            <span
              className="signin__link"
              onClick={() => history.push("/signup")}
            >
              Sign up now.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
