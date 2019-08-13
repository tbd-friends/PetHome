import React from "react";
import { AuthState, AuthActionTypes, AuthActions } from "./types";

const signInAction = (
  username: string,
  password: string,
  dispatch: React.Dispatch<AuthActionTypes>
) =>
  dispatch({
    type: AuthActions.SIGNIN,
    payload: {
      username,
      password
    }
  });

const signOutAction = (dispatch: React.Dispatch<AuthActionTypes>) =>
  dispatch({
    type: AuthActions.SIGNOUT
  });

export const useAuthActions = (
  state: AuthState,
  dispatch: React.Dispatch<AuthActionTypes>
) => ({
  signIn: (username: string, password: string) =>
    signInAction(username, password, dispatch),
  signOut: () => signOutAction(dispatch)
});
