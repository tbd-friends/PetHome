import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { LoginForm } from "./LoginForm";
import { LoginValues } from "./types";
import { useDispatch } from "react-redux";
import { KnownActions } from "../../../store/types";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../../../store/Auth/types";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const handleSubmit = (values: LoginValues) => {
    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: {
        ...values
      }
    });
  };

  return (
    <Card>
      {/* <CardHeader title="Login" titleTypographyProps={{ variant: "h3" }} /> */}
      <LoginForm
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};
