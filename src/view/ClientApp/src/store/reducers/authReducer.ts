import React from "react";
import { AuthActionTypes } from "./types";
import { AuthState } from "../contexts/types";

export const authReducer: React.Reducer<AuthState, AuthActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
