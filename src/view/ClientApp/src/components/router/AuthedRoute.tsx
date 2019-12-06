import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import { AppState } from "../../store/types";

interface AuthedRouteOwnProps {
  component?: any;
  //render?: any;
  redirect?: boolean;
  showLoader?: boolean;
}

type AuthedRouteProps = AuthedRouteOwnProps & RouteProps;

const AuthedRoute: React.FC<AuthedRouteProps> = ({
  component: Component,
  render: Render,
  children,
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
          if (Component) {
            return <Component {...props} />;
          } else if (Render) {
            return Render(props);
          } else {
            return children;
          }
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

export default AuthedRoute;
