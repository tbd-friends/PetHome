import React from "react";
import { AuthActionTypes, AuthActions } from "./types";
import { AuthState } from "./types";

const authReducerEx: React.Reducer<AuthState, AuthActionTypes> = (
  state,
  action
) => {
  console.log("Action: ", action);
  switch (action.type) {
    case AuthActions.USER_EXPIRED:
      return { ...state, user: null, isLoadingUser: false };
    case AuthActions.SILENT_RENEW_ERROR:
      return { ...state, user: null, isLoadingUser: false };
    case AuthActions.SESSION_TERMINATED:
    case AuthActions.USER_SIGNED_OUT:
      return { ...state, user: null, isLoadingUser: false };
    case AuthActions.USER_FOUND:
      return { ...state, user: action.payload.user, isLoadingUser: false };
    case AuthActions.LOADING_USER:
      return { ...state, isLoadingUser: true };
    default:
      return state;
  }
};

export const authReducer: React.Reducer<AuthState, AuthActionTypes> = (
  state,
  action
) => {
  const newState = authReducerEx(state, action);
  console.log("New State: ", newState);
  return newState;
};
