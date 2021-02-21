import React, { useRef, useState } from "react";
import { auth } from "../firebase";

import "../css/SignUp.css";
import { useHistory } from "react-router-dom";

function SignUp() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState(null);
  let history = useHistory();

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((res) =>
        res.user.updateProfile({
          displayName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
        })
      )
      .then(() => history.push("/"))
      .catch((error) => setErrors(error.message));
  };

  return (
    <div className="signup">
      <div className="getStarted__gradient"></div>
      <div className="signin__container">
        <form onSubmit={register}>
          <h1>Sign Up</h1>
          <input
            placeholder="First Name"
            type="text"
            ref={firstNameRef}
            required
          />
          <input
            placeholder="Last Name"
            type="text"
            ref={lastNameRef}
            required
          />
          <input placeholder="Email" type="email" ref={emailRef} required />
          <input
            placeholder="Password"
            type="password"
            ref={passwordRef}
            required
          />
          {errors && <p className="signup__error">{errors}</p>}

          <button type="submit" onSubmit={register}>
            Sign Up
          </button>
          <h4>
            <span className="signup__gray">Already have an account? </span>
            <span
              className="signup__link"
              onClick={() => history.push("/signin")}
            >
              Sign in now.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
