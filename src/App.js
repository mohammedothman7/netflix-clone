import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import db, { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { selectLoading, setLoading } from "./features/loadingSlice";

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

function App() {
  const isLoading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true)); // Set to true to display spinner while firebase auth loads
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // User logged in
        db.collection("customers")
          .doc(userAuth.uid)
          .collection("subscriptions")
          .get()
          .then((doc) => {
            if (doc?.docs[0]?.exists) {
              doc.forEach(async (subscription) => {
                dispatch(
                  login({
                    uid: userAuth.uid,
                    email: userAuth.email,
                    displayName: userAuth.displayName,
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end
                      .seconds,
                    current_period_start: subscription.data()
                      .current_period_start.seconds,
                  })
                );
              });
            } else {
              // If user does not have subscription
              dispatch(
                login({
                  uid: userAuth.uid,
                  email: userAuth.email,
                  displayName: userAuth.displayName,
                })
              );
            }
          })
          .catch(() => {
            dispatch(setLoading(false));
          });
      } else {
        // User logged out
        dispatch(logout());
        dispatch(setLoading(false));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // When user state changes is not null anymore than stop displaying spinner
  useEffect(() => {
    if (user) {
      dispatch(setLoading(false)); // Stop displaying spinner
    }
  }, [dispatch, user]);

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
