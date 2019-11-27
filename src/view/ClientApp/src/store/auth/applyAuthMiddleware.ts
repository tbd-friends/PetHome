import React from "react";
import { AuthActionTypes, AuthActions } from "./types";

export const applyAuthMiddleware = (
  dispatch: React.Dispatch<AuthActionTypes>
) => (action: AuthActionTypes) => {
  console.log(action);
  dispatch(action);
  switch (action.type) {
    case AuthActions.SIGNIN:
      fetch("api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: action.payload.username,
          password: action.payload.password
        })
      })
        .then(response => {
          if (response.status === 200) {
            return response.text();
          }

          throw "Invalid username or password";
        })
        .then(token => {
          localStorage.setItem("auth", token);

          dispatch({
            type: AuthActions.SIGNIN_SUCCESS,
            payload: { user: { sid: action.payload.username, token: token } }
          });
        })
        .catch(status => {
          dispatch({
            type: AuthActions.SIGNIN_FAILED,
            payload: { error: status }
          });
        });
      break;
    case AuthActions.SIGNOUT:
      // TODO: here goes call to signOut api
      dispatch({
        type: AuthActions.SIGNOUT_SUCCESS
      });
      break;
    default:
      return null;
  }
};
