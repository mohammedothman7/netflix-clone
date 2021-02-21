import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Home from "./components/Home";
import Profile from "./components/Profile";
import GetStarted from "./components/GetStarted";

import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
          })
        );
      } else {
        // User logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/get-started">
            <GetStarted />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/profile">{!user ? <GetStarted /> : <Profile />}</Route>
          <Route exact path="/">
            {!user ? <GetStarted /> : !user.role ? <Profile /> : <Home />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
