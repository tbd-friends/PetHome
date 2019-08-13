import React from "react";
import { AuthActionTypes, AuthActions } from "./types";

export const applyAuthMiddleware = (
  dispatch: React.Dispatch<AuthActionTypes>
) => (action: AuthActionTypes) => {
  console.log(action);
  dispatch(action);
  switch (action.type) {
    case AuthActions.SIGNIN:
      // TODO: here goes call to signIn api
      dispatch({
        type: AuthActions.SIGNIN_SUCCESS,
        payload: { user: { sid: "someid" } }
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
