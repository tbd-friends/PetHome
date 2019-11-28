import React from "react";
import {
  RouteProps,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router";
import { Loader } from "../Loader";
import { useSelector } from "react-redux";
import { AppState } from "../../store/types";

interface AuthedRouteOwnProps {
  component: React.FC<any>;
  redirect?: boolean;
  showLoader?: boolean;
}

type AuthedRouteProps = AuthedRouteOwnProps & RouteProps & RouteComponentProps;

const AuthedRoute: React.FC<AuthedRouteProps> = ({
  component: Component,
  redirect = true,
  showLoader = true,
  ...rest
}) => {
  const user = useSelector<AppState, any>(state => state.auth.user);
  return (
    <Route
      {...rest}
      render={props => {
        if (!window.localStorage["authedUser"]) {
          if (redirect) {
            return <Redirect to="/login" />;
          } else {
            return null;
          }
        } else if (!user) {
          if (showLoader) {
            return <Loader />;
          } else {
            return null;
          }
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default withRouter(AuthedRoute);
