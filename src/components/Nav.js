import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BannerLogo from "../assets/banner-logo.png";

import "../css/Nav.css";

function Nav() {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents"></div>
      <img
        onClick={() => history.push("/")}
        className="nav__logo"
        src={BannerLogo}
        alt="logo"
      />

      <img
        onClick={() => history.push("/profile")}
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="avatar"
      />
    </div>
  );
}

export default Nav;
