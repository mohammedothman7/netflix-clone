import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectUser } from "../features/userSlice";

// Only allow user to access home route if logged in and has a current subscription, otherwise redirect to profile page
const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!user && !!user?.role ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/profile" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
