import React from "react";
import {
  RouteProps,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router";
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
  const isLoggedIn = useSelector<AppState, boolean>(
    state => state.auth.isLoggedIn
  );
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return <Component {...rest} />;
        } else {
          if (redirect) {
            const { pathname } = props.location;
            return (
              <Redirect
                to={{ pathname: "/login", state: { returnUrl: pathname } }}
              />
            );
          } else {
            return null;
          }
        }
      }}
    />
  );
};

export default withRouter(AuthedRoute);
