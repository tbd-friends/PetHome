import React from "react";
import { useAuth } from "../../store/auth/useAuth";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

const PrivateRouteEx: React.FC<
  RouteProps & RouteComponentProps<any>
> = props => {
  const authCtx = useAuth();
  console.log(props, authCtx, Boolean(authCtx.state.user));
  const { path, location } = props;

  if (authCtx.state.user) {
    return <Route {...props} />;
  } else {
    if (path === location.pathname) {
      return (
        <Redirect
          to={{ pathname: "/signin", state: { returnUrl: props.path } }}
        />
      );
    } else {
      return null;
    }
  }
};

const PrivateRoute = withRouter(PrivateRouteEx);

export { PrivateRoute };
