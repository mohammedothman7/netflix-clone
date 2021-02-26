import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

// Components
import Home from "./components/Home";
import Profile from "./components/Profile";
import GetStarted from "./components/GetStarted";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import Spinner from "./components/Spinner";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { selectLoading, setLoading } from "./features/loadingSlice";

function App() {
  const isLoading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true)); // Set to true to display spinner while firebase auth loads
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User logged in
        dispatch(setLoading(false)); // Stop displaying spinner
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
          })
        );
      } else {
        // User logged out
        dispatch(setLoading(false));
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (isLoading) return <Spinner />; // Displaying spinner

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

          {user && <PrivateRoute path="/profile" component={Profile} />}
          {user && <ProtectedRoute exact path="/" component={Home} />}

          <Route component={user ? Profile : GetStarted} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
