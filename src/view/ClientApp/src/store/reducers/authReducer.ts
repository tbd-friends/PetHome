import React from "react";
import { AuthActionsTypes } from "./types";
import { AuthState } from "../contexts/types";

export const authReducer: React.Reducer<AuthState, AuthActionsTypes> = (
  state,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
