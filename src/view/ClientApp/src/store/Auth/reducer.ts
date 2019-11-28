import { AuthState, AuthActions } from "./types";
import { Reducer } from "redux";

const initialState: AuthState = {};

export const reducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
