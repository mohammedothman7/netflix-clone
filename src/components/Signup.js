import React, { useRef } from "react";
import { auth } from "../firebase";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setLoading } from "../features/loadingSlice";
import { resetErrors, selectErrors, setErrors } from "../features/errorsSlice";

import "../css/Signup.css";

function SignUp() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const user = useSelector(selectUser);
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();
  let history = useHistory();

  const register = (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    dispatch(resetErrors());

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
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setErrors(error.message));
      });
  };

  if (user) return <Redirect to="/" />;

  return (
    <div className="signup">
      <div className="getStarted__gradient"></div>
      <div className="signup__container">
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
            minLength="6"
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
