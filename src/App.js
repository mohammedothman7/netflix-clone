import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Nav from "./components/Nav";

import "./App.css";

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
        {!user ? ( // No user exist then display Login screen
          <Login />
        ) : !user?.role ? ( // User does not have subscription then display profile screen
          <>
            <Nav />
            <Profile />
          </>
        ) : (
          // User is logged in and has subscription allow access to enitre application
          <Switch>
            <Route path="/profile">
              <Nav />
              <Profile />
            </Route>
            <Route exact path="/">
              <Nav />
              <Home />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
