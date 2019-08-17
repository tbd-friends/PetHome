import React from "react";
import { AuthState, AuthActionTypes, AuthActions } from "./types";
import { User } from "oidc-client";

const userLoadedAction = (
  user: User,
  dispatch: React.Dispatch<AuthActionTypes>
) => {
  dispatch({ type: AuthActions.USER_FOUND, payload: { user } });
};
const silentRenewErrorAction = (
  error: Error,
  dispatch: React.Dispatch<AuthActionTypes>
) => {
  dispatch({ type: AuthActions.SILENT_RENEW_ERROR, payload: { error } });
};
const accessTokenExpiredAction = (
  dispatch: React.Dispatch<AuthActionTypes>
) => {
  dispatch({ type: AuthActions.USER_EXPIRED });
};
const accessTokenExpiringAction = (
  dispatch: React.Dispatch<AuthActionTypes>
) => {
  dispatch({ type: AuthActions.USER_EXPIRING });
};
const userUnloadedAction = (dispatch: React.Dispatch<AuthActionTypes>) => {
  dispatch({ type: AuthActions.SESSION_TERMINATED });
};
const userSignedOutAction = (dispatch: React.Dispatch<AuthActionTypes>) => {
  dispatch({ type: AuthActions.USER_SIGNED_OUT });
};

export const useAuthActions = (
  state: AuthState,
  dispatch: React.Dispatch<AuthActionTypes>
) => ({
  userLoaded: (user: User) => userLoadedAction(user, dispatch),
  silentRenewError: (error: Error) => silentRenewErrorAction(error, dispatch),
  accessTokenExpired: () => accessTokenExpiredAction(dispatch),
  accessTokenExpiring: () => accessTokenExpiringAction(dispatch),
  userUnloaded: () => userUnloadedAction(dispatch),
  userSignedOut: () => userSignedOutAction(dispatch)
});
