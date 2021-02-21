import React, { useState } from "react";

import "../css/GetStarted.css";
import { useHistory } from "react-router-dom";

function GetStarted() {
  const [email, setEmail] = useState("");
  let history = useHistory();

  const handleEmail = (email) => {
    setEmail(email);
  };

  return (
    <div className="getStarted">
      <div className="getStarted__background">
        <img
          className="getStarted__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="background"
        />
        <button
          className="getStarted__button"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </button>

        <div className="getStarted__gradient"></div>
      </div>
      <div className="getStarted__body">
        <>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>

          <div className="getStarted__input">
            <form>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
              />
              <button
                className="getStarted__getStarted"
                onClick={() => history.push("/signin")}
              >
                GET STARTED
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
}

export default GetStarted;
