import React from "react";
import {
  RouteProps,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router";

interface UnauthedRouteOwnProps {
  component: React.FC<any>;
}

type UnauthedRouteProps = UnauthedRouteOwnProps &
  RouteProps &
  RouteComponentProps;

const UnauthedRoute: React.FC<UnauthedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!window.localStorage.getItem("authedUser")) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default withRouter(UnauthedRoute);
