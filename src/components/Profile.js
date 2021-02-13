import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Plans from "./Plans";

import "../css/Profile.css";

function Profile() {
  const user = useSelector(selectUser);
  const role = user?.role;
  const roleCapitalized = role?.charAt(0)?.toUpperCase() + role?.slice(1);
  return (
    <div className="profile">
      <div className="profile__body">
        <h1>Edit Profile</h1>
        <div className="profile__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt="avatar"
          />
          <div className="profile__details">
            <h2>{user?.email}</h2>
            <div className="profile__plans">
              {role && <h3>Plans (Current Plan: {roleCapitalized})</h3>}

              <Plans />
              <button
                onClick={() => auth.signOut()}
                className="profile__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
