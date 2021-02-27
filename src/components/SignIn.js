import React, { useRef, useState } from "react";
import { auth } from "../firebase";

import "../css/SignIn.css";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setLoading } from "../features/loadingSlice";

function SignIn() {
  const location = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(() => history.push("/"))
      .catch((error) => setErrors(error.message));
  };

  if (user) return <Redirect to="/" />;

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
          {errors && <p className="signin__error">{errors}</p>}
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
