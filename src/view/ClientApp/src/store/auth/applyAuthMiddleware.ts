import React from "react";
import { AuthActionTypes, AuthActions } from "./types";

export const applyAuthMiddleware = (
  dispatch: React.Dispatch<AuthActionTypes>
) => (action: AuthActionTypes) => {
  console.log(action);
  dispatch(action);
  switch (action.type) {
    default:
      return null;
  }
};
