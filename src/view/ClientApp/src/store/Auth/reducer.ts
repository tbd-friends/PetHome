import { AuthState, AuthActions, AuthActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: AuthState = { isLoggedIn: false };

export const reducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
      };
    }
    default:
      return state;
  }
};
