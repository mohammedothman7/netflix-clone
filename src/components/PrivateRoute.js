import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectUser } from "../features/userSlice";

// Only allow user to access route if logged in, otherwise redirect to signin page
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!user ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
