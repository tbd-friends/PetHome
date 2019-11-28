import React from "react";
import { Card } from "@material-ui/core";
import { LoginForm } from "./LoginForm";
import { LoginValues } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { KnownActions, AppState } from "../../../store/types";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../../../store/Auth/types";
import { Redirect, RouteComponentProps } from "react-router";

export const LoginPage: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const isLoggedIn = useSelector<AppState, boolean>(
    state => state.auth.isLoggedIn
  );

  const { returnUrl } = location.state;

  const handleSubmit = (values: LoginValues) => {
    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: {
        ...values
      }
    });
  };

  return isLoggedIn ? (
    <Redirect to={returnUrl} />
  ) : (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card>
        <LoginForm
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};
